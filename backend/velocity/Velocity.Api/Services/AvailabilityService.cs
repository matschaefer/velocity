using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;
using Velocity.Api.Models;

namespace Velocity.Api.Services;

public interface IAvailabilityService
{
    Task<bool> IsAvailableAsync(Guid carId, DateTimeOffset pickupAt, DateTimeOffset dropoffAt, CancellationToken cancellationToken);
    Task<IReadOnlyCollection<UnavailablePeriodDto>> GetUnavailablePeriodsAsync(Guid carId, CancellationToken cancellationToken);
    AvailabilityDto CalculateAvailability(Car car, DateTimeOffset pickupAt, DateTimeOffset dropoffAt, bool isAvailable);
}

public class AvailabilityService(VelocityDbContext dbContext) : IAvailabilityService
{
    public async Task<bool> IsAvailableAsync(Guid carId, DateTimeOffset pickupAt, DateTimeOffset dropoffAt, CancellationToken cancellationToken)
    {
        if (pickupAt >= dropoffAt)
        {
            return false;
        }

        var hasConfirmedBooking = await dbContext.Bookings.AnyAsync(
            booking =>
                booking.CarId == carId &&
                booking.Status == BookingStatus.Confirmed &&
                booking.PickupAt < dropoffAt &&
                pickupAt < booking.DropoffAt,
            cancellationToken);

        if (hasConfirmedBooking)
        {
            return false;
        }

        return !await dbContext.CarBlocks.AnyAsync(
            block =>
                block.CarId == carId &&
                block.StartAt < dropoffAt &&
                pickupAt < block.EndAt,
            cancellationToken);
    }

    public async Task<IReadOnlyCollection<UnavailablePeriodDto>> GetUnavailablePeriodsAsync(Guid carId, CancellationToken cancellationToken)
    {
        var bookings = await dbContext.Bookings
            .Where(booking => booking.CarId == carId && booking.Status == BookingStatus.Confirmed)
            .Select(booking => new UnavailablePeriodDto(booking.PickupAt, booking.DropoffAt, "Bestätigte Buchung"))
            .ToListAsync(cancellationToken);

        var blocks = await dbContext.CarBlocks
            .Where(block => block.CarId == carId)
            .Select(block => new UnavailablePeriodDto(block.StartAt, block.EndAt, block.Reason.ToGermanLabel()))
            .ToListAsync(cancellationToken);

        return bookings.Concat(blocks).OrderBy(period => period.StartAt).ToList();
    }

    public AvailabilityDto CalculateAvailability(Car car, DateTimeOffset pickupAt, DateTimeOffset dropoffAt, bool isAvailable)
    {
        var rentalDays = Math.Max(1, (int)Math.Ceiling((dropoffAt - pickupAt).TotalDays));
        return new AvailabilityDto(isAvailable, car.PricePerDay * rentalDays, rentalDays);
    }
}
