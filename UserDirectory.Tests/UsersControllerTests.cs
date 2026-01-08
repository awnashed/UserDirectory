using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using UserDirectory.Api.Controllers;
using UserDirectory.Api.Models;
using UserDirectory.Api.Services;
using Xunit;

namespace UserDirectory.Tests;

public class UsersControllerTests
{
    private readonly Mock<IUserService> _mockService;
    private readonly Mock<ILogger<UsersController>> _mockLogger;
    private readonly UsersController _controller;

    public UsersControllerTests()
    {
        _mockService = new Mock<IUserService>();
        _mockLogger = new Mock<ILogger<UsersController>>();
        _controller = new UsersController(_mockService.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetUsers_ReturnsOkResult_WithListOfUsers()
    {
        // Arrange
        var users = new List<User>
        {
            new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" },
            new User { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" }
        };
        _mockService.Setup(s => s.GetAllUsersAsync()).ReturnsAsync(users);

        // Act
        var result = await _controller.GetUsers();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedUsers = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);
        Assert.Equal(2, returnedUsers.Count());
    }

    [Fact]
    public async Task GetUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        _mockService.Setup(s => s.GetUserByIdAsync(It.IsAny<int>())).ReturnsAsync((User?)null);

        // Act
        var result = await _controller.GetUser(1);

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateUser_ReturnsCreatedAtAction()
    {
        // Arrange
        var user = new User { FirstName = "John", LastName = "Doe", Email = "john@example.com" };
        var createdUser = new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" };
        _mockService.Setup(s => s.CreateUserAsync(user)).ReturnsAsync(createdUser);

        // Act
        var result = await _controller.CreateUser(user);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        Assert.Equal(nameof(_controller.GetUser), createdResult.ActionName);
        Assert.Equal(1, ((User)createdResult.Value!).Id);
    }

    [Fact]
    public async Task DeleteUser_ReturnsNoContent_WhenSuccessful()
    {
        // Arrange
        _mockService.Setup(s => s.DeleteUserAsync(1)).ReturnsAsync(true);

        // Act
        var result = await _controller.DeleteUser(1);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }
}