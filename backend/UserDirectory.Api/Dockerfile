FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["UserDirectory.Api/UserDirectory.Api.csproj", "UserDirectory.Api/"]
RUN dotnet restore "UserDirectory.Api/UserDirectory.Api.csproj"
COPY . .
WORKDIR "/src/UserDirectory.Api"
RUN dotnet build "UserDirectory.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UserDirectory.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserDirectory.Api.dll"]