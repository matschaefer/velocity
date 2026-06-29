using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;
using Velocity.Api.Services;

namespace Velocity.Api.Controllers;

[ApiController]
[Route("api/cars")]
public class CarsController(VelocityDbContext dbContext, IAvailabilityService availabilityService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<CarListItemDto>>> GetCars(
        [FromQuery] DateTimeOffset? pickupAt,
        [FromQuery] DateTimeOffset? dropoffAt,
        [FromQuery] string? location,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Cars.AsNoTracking().Where(car => car.IsActive);

        if (!string.IsNullOrWhiteSpace(location))
        {
            query = query.Where(car => car.Location.ToLower() == location.ToLower());
        }

        var cars = await query.OrderByDescending(car => car.IsFeatured).ThenBy(car => car.PricePerDay).ToListAsync(cancellationToken);
        var items = new List<CarListItemDto>();

        foreach (var car in cars)
        {
            var isAvailable = pickupAt is null || dropoffAt is null ||
                await availabilityService.IsAvailableAsync(car.Id, pickupAt.Value, dropoffAt.Value, cancellationToken);
            items.Add(car.ToListItem(isAvailable));
        }

        return Ok(items);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<CarDetailDto>> GetCar(string slug, CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.AsNoTracking().FirstOrDefaultAsync(car => car.Slug == slug, cancellationToken);
        if (car is null)
        {
            return NotFound();
        }

        var unavailablePeriods = await availabilityService.GetUnavailablePeriodsAsync(car.Id, cancellationToken);
        return Ok(car.ToDetail(unavailablePeriods));
    }

    [HttpGet("{id:guid}/availability")]
    public async Task<ActionResult<AvailabilityDto>> GetAvailability(
        Guid id,
        [FromQuery] DateTimeOffset pickupAt,
        [FromQuery] DateTimeOffset dropoffAt,
        CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.AsNoTracking().FirstOrDefaultAsync(car => car.Id == id && car.IsActive, cancellationToken);
        if (car is null)
        {
            return NotFound();
        }

        var isAvailable = await availabilityService.IsAvailableAsync(id, pickupAt, dropoffAt, cancellationToken);
        return Ok(availabilityService.CalculateAvailability(car, pickupAt, dropoffAt, isAvailable));
    }
}
