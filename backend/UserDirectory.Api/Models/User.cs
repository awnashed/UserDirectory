using System.ComponentModel.DataAnnotations;

namespace UserDirectory.Api.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Phone]
    public string? PhoneNumber { get; set; }

    [StringLength(100)]
    public string? Department { get; set; }

    [Required]
    [Range(0, 120)]
    public int Age { get; set; }

    [Required]
    [StringLength(100)]
    public string City { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string State { get; set; } = string.Empty;

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public string PostCode { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
}