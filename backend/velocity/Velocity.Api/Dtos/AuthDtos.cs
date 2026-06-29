namespace Velocity.Api.Dtos;

public record RegisterRequest(string Email, string Password, string FirstName, string LastName, string? PhoneNumber);

public record LoginRequest(string Email, string Password);

public record UserDto(string Id, string Email, string FirstName, string LastName, string? PhoneNumber, IReadOnlyCollection<string> Roles);
