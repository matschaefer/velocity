using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;
using Velocity.Api.Models;
using Velocity.Api.Services;

namespace Velocity.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/bookings")]
public class BookingsController(VelocityDbContext dbContext, IAvailabilityService availabilityService) : ControllerBase
{
    [HttpGet("me")]
    public async Task<ActionResult<IReadOnlyCollection<BookingDto>>> GetMyBookings(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var bookings = await dbContext.Bookings
            .Include(booking => booking.Car)
            .Where(booking => booking.UserId == userId)
            .OrderByDescending(booking => booking.CreatedAt)
            .ToListAsync(cancellationToken);

        return Ok(bookings.Select(booking => booking.ToDto()).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<BookingDto>> CreateBooking(CreateBookingRequest request, CancellationToken cancellationToken)
    {
        if (request.PickupAt >= request.DropoffAt)
        {
            return BadRequest(new { message = "Die Rückgabe muss nach der Abholung liegen." });
        }

        var car = await dbContext.Cars.FirstOrDefaultAsync(car => car.Id == request.CarId && car.IsActive, cancellationToken);
        if (car is null)
        {
            return NotFound(new { message = "Fahrzeug wurde nicht gefunden." });
        }

        var isAvailable = await availabilityService.IsAvailableAsync(car.Id, request.PickupAt, request.DropoffAt, cancellationToken);
        if (!isAvailable)
        {
            return Conflict(new { message = "Dieses Fahrzeug ist im gewünschten Zeitraum nicht verfügbar." });
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return Unauthorized();
        }

        var price = availabilityService.CalculateAvailability(car, request.PickupAt, request.DropoffAt, true).TotalPrice;
        var booking = new Booking
        {
            CarId = car.Id,
            UserId = userId,
            PickupAt = request.PickupAt,
            DropoffAt = request.DropoffAt,
            PickupLocation = request.PickupLocation,
            DropoffLocation = request.DropoffLocation,
            TotalPrice = price,
            Notes = request.Notes,
            Status = BookingStatus.Pending
        };

        dbContext.Bookings.Add(booking);
        await dbContext.SaveChangesAsync(cancellationToken);

        booking.Car = car;
        return CreatedAtAction(nameof(GetMyBookings), booking.ToDto());
    }
}
