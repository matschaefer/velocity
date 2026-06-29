namespace Velocity.Api.Models;

public class CarBlock
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CarId { get; set; }
    public Car Car { get; set; } = null!;
    public DateTimeOffset StartAt { get; set; }
    public DateTimeOffset EndAt { get; set; }
    public BlockReason Reason { get; set; } = BlockReason.Admin;
    public string? Notes { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
