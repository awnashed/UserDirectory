using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.Models;

namespace UserDirectory.Api.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.OrderBy(u => u.LastName).ToListAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> CreateUserAsync(User user)
    {
        user.CreatedAt = DateTime.UtcNow;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> UpdateUserAsync(int id, User user)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null) return null;

        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        existingUser.PhoneNumber = user.PhoneNumber;
        existingUser.Department = user.Department;
        existingUser.Age = user.Age;
        existingUser.City = user.City;
        existingUser.State = user.State;
        existingUser.PostCode = user.PostCode;
        existingUser.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return existingUser;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false;

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}