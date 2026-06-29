using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Velocity.Api.Dtos;
using Velocity.Api.Models;

namespace Velocity.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            PhoneNumber = request.PhoneNumber
        };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                message = string.Join(" ", result.Errors.Select(error => ToGermanIdentityError(error.Code, error.Description)))
            });
        }

        await userManager.AddToRoleAsync(user, "User");
        await signInManager.SignInAsync(user, isPersistent: true);

        return Ok(await ToUserDto(user));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Unauthorized(new { message = "E-Mail oder Passwort ist falsch." });
        }

        var result = await signInManager.PasswordSignInAsync(user, request.Password, isPersistent: true, lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            return Unauthorized(new { message = "E-Mail oder Passwort ist falsch." });
        }

        return Ok(await ToUserDto(user));
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            return Unauthorized();
        }

        var user = await userManager.FindByIdAsync(userId);
        return user is null ? Unauthorized() : Ok(await ToUserDto(user));
    }

    private async Task<UserDto> ToUserDto(ApplicationUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        return new UserDto(user.Id, user.Email ?? string.Empty, user.FirstName, user.LastName, user.PhoneNumber, roles.ToList());
    }

    private static string ToGermanIdentityError(string code, string fallback) =>
        code switch
        {
            "DuplicateUserName" or "DuplicateEmail" => "Für diese E-Mail existiert bereits ein Konto.",
            "PasswordTooShort" => "Das Passwort muss mindestens 8 Zeichen lang sein.",
            "PasswordRequiresDigit" => "Das Passwort muss mindestens eine Zahl enthalten.",
            "PasswordRequiresLower" => "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.",
            "PasswordRequiresUpper" => "Das Passwort muss mindestens einen Großbuchstaben enthalten.",
            _ => fallback
        };
}
