using Velocity.Api.Models;

namespace Velocity.Api.Dtos;

public record CreateBlockRequest(DateTimeOffset StartAt, DateTimeOffset EndAt, BlockReason Reason, string? Notes);

public record BlockDto(Guid Id, Guid CarId, DateTimeOffset StartAt, DateTimeOffset EndAt, string Reason, string? Notes);

public static class BlockMappings
{
    public static BlockDto ToDto(this CarBlock block) =>
        new(block.Id, block.CarId, block.StartAt, block.EndAt, block.Reason.ToGermanLabel(), block.Notes);
}
