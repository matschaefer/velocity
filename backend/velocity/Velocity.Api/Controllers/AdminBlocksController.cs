using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Velocity.Api.Data;
using Velocity.Api.Dtos;
using Velocity.Api.Models;

namespace Velocity.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/admin/cars/{carId:guid}/blocks")]
public class AdminBlocksController(VelocityDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<BlockDto>>> GetBlocks(Guid carId, CancellationToken cancellationToken)
    {
        var blocks = await dbContext.CarBlocks
            .Where(block => block.CarId == carId)
            .OrderBy(block => block.StartAt)
            .ToListAsync(cancellationToken);

        return Ok(blocks.Select(block => block.ToDto()).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<BlockDto>> CreateBlock(Guid carId, CreateBlockRequest request, CancellationToken cancellationToken)
    {
        if (request.StartAt >= request.EndAt)
        {
            return BadRequest(new { message = "Das Ende der Blockierung muss nach dem Start liegen." });
        }

        var carExists = await dbContext.Cars.AnyAsync(car => car.Id == carId, cancellationToken);
        if (!carExists)
        {
            return NotFound();
        }

        var block = new CarBlock
        {
            CarId = carId,
            StartAt = request.StartAt,
            EndAt = request.EndAt,
            Reason = request.Reason,
            Notes = request.Notes
        };

        dbContext.CarBlocks.Add(block);
        await dbContext.SaveChangesAsync(cancellationToken);
        return CreatedAtAction(nameof(GetBlocks), new { carId }, block.ToDto());
    }

    [HttpDelete("{blockId:guid}")]
    public async Task<IActionResult> DeleteBlock(Guid carId, Guid blockId, CancellationToken cancellationToken)
    {
        var block = await dbContext.CarBlocks.FirstOrDefaultAsync(block => block.CarId == carId && block.Id == blockId, cancellationToken);
        if (block is null)
        {
            return NotFound();
        }

        dbContext.CarBlocks.Remove(block);
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPut("{blockId:guid}")]
    public async Task<IActionResult> UpdateBlock(Guid carId, Guid blockId, CreateBlockRequest request, CancellationToken cancellationToken)
    {
        if (request.StartAt >= request.EndAt)
        {
            return BadRequest(new { message = "Das Ende der Blockierung muss nach dem Start liegen." });
        }

        var block = await dbContext.CarBlocks.FirstOrDefaultAsync(block => block.CarId == carId && block.Id == blockId, cancellationToken);
        if (block is null)
        {
            return NotFound();
        }

        block.StartAt = request.StartAt;
        block.EndAt = request.EndAt;
        block.Reason = request.Reason;
        block.Notes = request.Notes;
        await dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
