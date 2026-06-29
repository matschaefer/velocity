using Velocity.Api.Models;

namespace Velocity.Api.Dtos;

public record CreateBookingRequest(
    Guid CarId,
    DateTimeOffset PickupAt,
    DateTimeOffset DropoffAt,
    string PickupLocation,
    string DropoffLocation,
    string? Notes);

public record BookingDto(
    Guid Id,
    Guid CarId,
    string CarName,
    DateTimeOffset PickupAt,
    DateTimeOffset DropoffAt,
    string PickupLocation,
    string DropoffLocation,
    string Status,
    decimal TotalPrice,
    string? Notes,
    DateTimeOffset CreatedAt);

public record UpdateBookingStatusRequest(BookingStatus Status);

public static class BookingMappings
{
    public static BookingDto ToDto(this Booking booking) =>
        new(
            booking.Id,
            booking.CarId,
            $"{booking.Car.Brand} {booking.Car.Model}",
            booking.PickupAt,
            booking.DropoffAt,
            booking.PickupLocation,
            booking.DropoffLocation,
            booking.Status.ToGermanLabel(),
            booking.TotalPrice,
            booking.Notes,
            booking.CreatedAt);
}
