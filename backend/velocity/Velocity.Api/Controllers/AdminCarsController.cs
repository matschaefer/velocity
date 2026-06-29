using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;

namespace Velocity.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/admin/cars")]
public class AdminCarsController(VelocityDbContext dbContext, Velocity.Api.Services.IAvailabilityService availabilityService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<CarDetailDto>>> GetCars(CancellationToken cancellationToken)
    {
        var cars = await dbContext.Cars.AsNoTracking().OrderBy(car => car.Brand).ThenBy(car => car.Model).ToListAsync(cancellationToken);
        var result = new List<CarDetailDto>();

        foreach (var car in cars)
        {
            result.Add(car.ToDetail(await availabilityService.GetUnavailablePeriodsAsync(car.Id, cancellationToken)));
        }

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CarDetailDto>> CreateCar(CreateCarRequest request, CancellationToken cancellationToken)
    {
        var car = request.ToEntity();
        dbContext.Cars.Add(car);
        await dbContext.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(GetCars), car.ToDetail([]));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCar(Guid id, UpdateCarRequest request, CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.FindAsync([id], cancellationToken);
        if (car is null)
        {
            return NotFound();
        }

        car.Brand = request.Brand;
        car.Model = request.Model;
        car.Slug = request.Slug;
        car.PricePerDay = request.PricePerDay;
        car.ImageUrl = request.ImageUrl;
        car.GalleryImageUrls = string.Join('\n', request.ImageUrls ?? []);
        car.Description = request.Description;
        car.HorsePower = request.HorsePower;
        car.Year = request.Year;
        car.Seats = request.Seats;
        car.Transmission = request.Transmission;
        car.FuelType = request.FuelType;
        car.Deposit = request.Deposit;
        car.MinimumAge = request.MinimumAge;
        car.Location = request.Location;
        car.IsActive = request.IsActive;
        car.IsFeatured = request.IsFeatured;
        car.Badge = request.Badge;

        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCar(Guid id, CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.FindAsync([id], cancellationToken);
        if (car is null)
        {
            return NotFound();
        }

        dbContext.Cars.Remove(car);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
