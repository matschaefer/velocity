using Velocity.Api.Models;

namespace Velocity.Api.Dtos;

public record CarListItemDto(
    Guid Id,
    string Brand,
    string Model,
    string Slug,
    decimal PricePerDay,
    string ImageUrl,
    IReadOnlyCollection<string> ImageUrls,
    string Location,
    bool IsFeatured,
    string? Badge,
    bool IsAvailable);

public record CarDetailDto(
    Guid Id,
    string Brand,
    string Model,
    string Slug,
    decimal PricePerDay,
    string ImageUrl,
    IReadOnlyCollection<string> ImageUrls,
    string Description,
    int HorsePower,
    int Year,
    int Seats,
    string Transmission,
    string FuelType,
    decimal Deposit,
    int MinimumAge,
    string Location,
    bool IsActive,
    bool IsFeatured,
    string? Badge,
    IReadOnlyCollection<UnavailablePeriodDto> UnavailablePeriods);

public record CreateCarRequest(
    string Brand,
    string Model,
    string Slug,
    decimal PricePerDay,
    string ImageUrl,
    IReadOnlyCollection<string>? ImageUrls,
    string Description,
    int HorsePower,
    int Year,
    int Seats,
    string Transmission,
    string FuelType,
    decimal Deposit,
    int MinimumAge,
    string Location,
    bool IsActive,
    bool IsFeatured,
    string? Badge);

public record UpdateCarRequest(
    string Brand,
    string Model,
    string Slug,
    decimal PricePerDay,
    string ImageUrl,
    IReadOnlyCollection<string>? ImageUrls,
    string Description,
    int HorsePower,
    int Year,
    int Seats,
    string Transmission,
    string FuelType,
    decimal Deposit,
    int MinimumAge,
    string Location,
    bool IsActive,
    bool IsFeatured,
    string? Badge);

public record AvailabilityQuery(DateTimeOffset PickupAt, DateTimeOffset DropoffAt, string? Location);

public record AvailabilityDto(bool IsAvailable, decimal TotalPrice, int RentalDays);

public record UnavailablePeriodDto(DateTimeOffset StartAt, DateTimeOffset EndAt, string Reason);

public static class CarMappings
{
    public static CarListItemDto ToListItem(this Car car, bool isAvailable) =>
        new(car.Id, car.Brand, car.Model, car.Slug, car.PricePerDay, car.ImageUrl, car.GetImageUrls(), car.Location, car.IsFeatured, car.Badge, isAvailable);

    public static CarDetailDto ToDetail(this Car car, IReadOnlyCollection<UnavailablePeriodDto> unavailablePeriods) =>
        new(
            car.Id,
            car.Brand,
            car.Model,
            car.Slug,
            car.PricePerDay,
            car.ImageUrl,
            car.GetImageUrls(),
            car.Description,
            car.HorsePower,
            car.Year,
            car.Seats,
            car.Transmission,
            car.FuelType,
            car.Deposit,
            car.MinimumAge,
            car.Location,
            car.IsActive,
            car.IsFeatured,
            car.Badge,
            unavailablePeriods);

    public static Car ToEntity(this CreateCarRequest request) =>
        new()
        {
            Brand = request.Brand,
            Model = request.Model,
            Slug = request.Slug,
            PricePerDay = request.PricePerDay,
            ImageUrl = request.ImageUrl,
            GalleryImageUrls = string.Join('\n', request.ImageUrls ?? []),
            Description = request.Description,
            HorsePower = request.HorsePower,
            Year = request.Year,
            Seats = request.Seats,
            Transmission = request.Transmission,
            FuelType = request.FuelType,
            Deposit = request.Deposit,
            MinimumAge = request.MinimumAge,
            Location = request.Location,
            IsActive = request.IsActive,
            IsFeatured = request.IsFeatured,
            Badge = request.Badge
        };

    public static IReadOnlyCollection<string> GetImageUrls(this Car car)
    {
        var urls = car.GalleryImageUrls
            .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Prepend(car.ImageUrl)
            .Where(url => !string.IsNullOrWhiteSpace(url))
            .Distinct()
            .ToList();

        return urls.Count > 0 ? urls : [car.ImageUrl];
    }
}
