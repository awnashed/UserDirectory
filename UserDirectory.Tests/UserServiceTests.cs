using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.Models;
using UserDirectory.Api.Services;
using Xunit;

namespace UserDirectory.Tests;

public class UserServiceTests
{
    private AppDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task CreateUserAsync_ShouldAddUser()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var service = new UserService(context);
        var user = new User
        {
            FirstName = "John",
            LastName = "Doe",
            Email = "john.doe@example.com"
        };

        // Act
        var result = await service.CreateUserAsync(user);

        // Assert
        Assert.NotEqual(0, result.Id);
        Assert.Equal("John", result.FirstName);
        Assert.Equal(1, await context.Users.CountAsync());
    }

    [Fact]
    public async Task GetAllUsersAsync_ShouldReturnAllUsers()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var service = new UserService(context);

        context.Users.AddRange(
            new User { FirstName = "John", LastName = "Doe", Email = "john@example.com" },
            new User { FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" }
        );
        await context.SaveChangesAsync();

        // Act
        var users = await service.GetAllUsersAsync();

        // Assert
        Assert.Equal(2, users.Count());
    }

    [Fact]
    public async Task UpdateUserAsync_ShouldUpdateExistingUser()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var service = new UserService(context);

        var user = new User { FirstName = "John", LastName = "Doe", Email = "john@example.com" };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Act
        user.FirstName = "Johnny";
        var result = await service.UpdateUserAsync(user.Id, user);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Johnny", result.FirstName);
    }

    [Fact]
    public async Task DeleteUserAsync_ShouldRemoveUser()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var service = new UserService(context);

        var user = new User { FirstName = "John", LastName = "Doe", Email = "john@example.com" };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Act
        var result = await service.DeleteUserAsync(user.Id);

        // Assert
        Assert.True(result);
        Assert.Equal(0, await context.Users.CountAsync());
    }
}