namespace Velocity.Api.Models;

public class Car
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public decimal PricePerDay { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string GalleryImageUrls { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int HorsePower { get; set; }
    public int Year { get; set; }
    public int Seats { get; set; }
    public string Transmission { get; set; } = string.Empty;
    public string FuelType { get; set; } = string.Empty;
    public decimal Deposit { get; set; }
    public int MinimumAge { get; set; }
    public string Location { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public bool IsFeatured { get; set; }
    public string? Badge { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public ICollection<Booking> Bookings { get; set; } = [];
    public ICollection<CarBlock> Blocks { get; set; } = [];
}
