using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Models;

namespace Velocity.Api.Data;

public class VelocityDbContext(DbContextOptions<VelocityDbContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Car> Cars => Set<Car>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<CarBlock> CarBlocks => Set<CarBlock>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Car>(entity =>
        {
            entity.HasIndex(car => car.Slug).IsUnique();
            entity.Property(car => car.PricePerDay).HasPrecision(10, 2);
            entity.Property(car => car.Deposit).HasPrecision(10, 2);
            entity.Property(car => car.GalleryImageUrls).HasDefaultValue(string.Empty);
        });

        builder.Entity<Booking>(entity =>
        {
            entity.Property(booking => booking.TotalPrice).HasPrecision(10, 2);
            entity.HasIndex(booking => new { booking.CarId, booking.PickupAt, booking.DropoffAt });
        });

        builder.Entity<CarBlock>()
            .HasIndex(block => new { block.CarId, block.StartAt, block.EndAt });

        builder.Entity<Car>().HasData(SeedCars);
    }

    private static readonly Car[] SeedCars =
    [
        new()
        {
            Id = Guid.Parse("edaf61bd-00f5-42f7-a086-2c6dde31cf3d"),
            Brand = "Mercedes-AMG",
            Model = "CLE 53 4MATIC+",
            Slug = "mercedes-amg-cle-53-4matic",
            PricePerDay = 279,
            ImageUrl = "/cars/mercedes_cle.png",
            Description = "Elegantes Coupe mit AMG-Performance, Allrad und komfortabler Langstreckenausstattung.",
            HorsePower = 449,
            Year = 2025,
            Seats = 4,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 2500,
            MinimumAge = 25,
            Location = "Düsseldorf"
        },
        new()
        {
            Id = Guid.Parse("48cef016-e349-44a1-9119-8df8cc8e70ec"),
            Brand = "Range Rover",
            Model = "Velar",
            Slug = "range-rover-velar",
            PricePerDay = 296,
            ImageUrl = "/cars/rangerover_velar.png",
            Description = "Luxus-SUV mit souveränem Auftritt, viel Komfort und starker Präsenz.",
            HorsePower = 400,
            Year = 2024,
            Seats = 5,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 2500,
            MinimumAge = 23,
            Location = "Düsseldorf",
            IsFeatured = true,
            Badge = "Beliebt"
        },
        new()
        {
            Id = Guid.Parse("9e399b21-8b95-495d-82ed-38d38e7d4ebf"),
            Brand = "Ferrari",
            Model = "SF90 Stradale",
            Slug = "ferrari-sf90-stradale",
            PricePerDay = 2199,
            ImageUrl = "/cars/ferrari_sf90.png",
            Description = "Hybrid-Supersportwagen mit kompromissloser Ferrari-DNA und extremer Performance.",
            HorsePower = 1000,
            Year = 2024,
            Seats = 2,
            Transmission = "Automatik",
            FuelType = "Hybrid",
            Deposit = 10000,
            MinimumAge = 28,
            Location = "Düsseldorf"
        },
        new()
        {
            Id = Guid.Parse("75cc78c0-dfef-43c0-968b-6dce7fb62d66"),
            Brand = "Porsche",
            Model = "911 Turbo S",
            Slug = "porsche-911-turbo-s",
            PricePerDay = 699,
            ImageUrl = "/cars/porsche_turbos.png",
            Description = "Ikonischer Sportwagen mit brachialer Beschleunigung und hoher Alltagstauglichkeit.",
            HorsePower = 650,
            Year = 2024,
            Seats = 4,
            Transmission = "PDK",
            FuelType = "Benzin",
            Deposit = 5000,
            MinimumAge = 25,
            Location = "Düsseldorf"
        },
        new()
        {
            Id = Guid.Parse("c17af4c8-bc9c-4b72-a902-d3e603ff3a32"),
            Brand = "Lamborghini",
            Model = "Huracán EVO",
            Slug = "lamborghini-huracan-evo",
            PricePerDay = 1299,
            ImageUrl = "/cars/lamborghini_huracan.png",
            Description = "Emotionaler V10-Supersportwagen mit maximaler Präsenz und Sound.",
            HorsePower = 640,
            Year = 2023,
            Seats = 2,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 7500,
            MinimumAge = 28,
            Location = "Mülheim"
        },
        new()
        {
            Id = Guid.Parse("1ec7d313-3fa6-4ad2-9e5e-665316718093"),
            Brand = "BMW",
            Model = "M4 Competition",
            Slug = "bmw-m4-competition",
            PricePerDay = 349,
            ImageUrl = "/cars/bmw_m4.png",
            Description = "Dynamisches M-Coupe mit scharfem Handling und sportlichem Komfort.",
            HorsePower = 510,
            Year = 2024,
            Seats = 4,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 3000,
            MinimumAge = 23,
            Location = "Mülheim"
        },
        new()
        {
            Id = Guid.Parse("9fdeca3b-b9dc-4b15-90f9-5f4e47cb843e"),
            Brand = "Audi",
            Model = "RS6 Performance",
            Slug = "audi-rs6-performance",
            PricePerDay = 449,
            ImageUrl = "/cars/audi_rs6.png",
            Description = "High-Performance-Kombi mit Raum, Komfort und massiver Leistung.",
            HorsePower = 630,
            Year = 2024,
            Seats = 5,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 4000,
            MinimumAge = 25,
            Location = "Düsseldorf"
        },
        new()
        {
            Id = Guid.Parse("fbcce759-b8f9-433d-b75d-419024d79d7d"),
            Brand = "Porsche",
            Model = "Cayenne Turbo GT",
            Slug = "porsche-cayenne-turbo-gt",
            PricePerDay = 649,
            ImageUrl = "/cars/porsche_cayenne.png",
            Description = "Sportlicher Luxus-SUV mit enormer Leistung und hochwertigem Innenraum.",
            HorsePower = 659,
            Year = 2024,
            Seats = 5,
            Transmission = "Automatik",
            FuelType = "Benzin",
            Deposit = 5000,
            MinimumAge = 25,
            Location = "Mülheim"
        }
    ];
}
