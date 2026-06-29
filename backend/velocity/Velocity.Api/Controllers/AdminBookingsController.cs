using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;

namespace Velocity.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/admin/bookings")]
public class AdminBookingsController(VelocityDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<BookingDto>>> GetBookings(CancellationToken cancellationToken)
    {
        var bookings = await dbContext.Bookings
            .Include(booking => booking.Car)
            .OrderByDescending(booking => booking.CreatedAt)
            .ToListAsync(cancellationToken);

        return Ok(bookings.Select(booking => booking.ToDto()).ToList());
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, UpdateBookingStatusRequest request, CancellationToken cancellationToken)
    {
        var booking = await dbContext.Bookings.FindAsync([id], cancellationToken);
        if (booking is null)
        {
            return NotFound();
        }

        booking.Status = request.Status;
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
