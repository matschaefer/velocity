namespace Velocity.Api.Models;

public class Booking
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CarId { get; set; }
    public Car Car { get; set; } = null!;
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;
    public DateTimeOffset PickupAt { get; set; }
    public DateTimeOffset DropoffAt { get; set; }
    public string PickupLocation { get; set; } = string.Empty;
    public string DropoffLocation { get; set; } = string.Empty;
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public decimal TotalPrice { get; set; }
    public string? Notes { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
