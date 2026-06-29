using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Velocity.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Brand = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    PricePerDay = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    HorsePower = table.Column<int>(type: "integer", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Seats = table.Column<int>(type: "integer", nullable: false),
                    Transmission = table.Column<string>(type: "text", nullable: false),
                    FuelType = table.Column<string>(type: "text", nullable: false),
                    Deposit = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    MinimumAge = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    Badge = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CarId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    PickupAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DropoffAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    PickupLocation = table.Column<string>(type: "text", nullable: false),
                    DropoffLocation = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarBlocks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CarId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    EndAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarBlocks_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "Badge", "Brand", "CreatedAt", "Deposit", "Description", "FuelType", "HorsePower", "ImageUrl", "IsActive", "IsFeatured", "Location", "MinimumAge", "Model", "PricePerDay", "Seats", "Slug", "Transmission", "Year" },
                values: new object[,]
                {
                    { new Guid("1ec7d313-3fa6-4ad2-9e5e-665316718093"), null, "BMW", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(710), new TimeSpan(0, 0, 0, 0, 0)), 3000m, "Dynamisches M-Coupe mit scharfem Handling und sportlichem Komfort.", "Benzin", 510, "/cars/bmw_m4.png", true, false, "München", 23, "M4 Competition", 349m, 4, "bmw-m4-competition", "Automatik", 2024 },
                    { new Guid("48cef016-e349-44a1-9119-8df8cc8e70ec"), "Beliebt", "Range Rover", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(397), new TimeSpan(0, 0, 0, 0, 0)), 2500m, "Luxus-SUV mit souveränem Auftritt, viel Komfort und starker Präsenz.", "Benzin", 400, "/cars/rangerover_velar.png", true, true, "München", 23, "Velar", 296m, 5, "range-rover-velar", "Automatik", 2024 },
                    { new Guid("75cc78c0-dfef-43c0-968b-6dce7fb62d66"), null, "Porsche", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(696), new TimeSpan(0, 0, 0, 0, 0)), 5000m, "Ikonischer Sportwagen mit brachialer Beschleunigung und hoher Alltagstauglichkeit.", "Benzin", 650, "/cars/porsche_turbos.png", true, false, "München", 25, "911 Turbo S", 699m, 4, "porsche-911-turbo-s", "PDK", 2024 },
                    { new Guid("9e399b21-8b95-495d-82ed-38d38e7d4ebf"), null, "Ferrari", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(691), new TimeSpan(0, 0, 0, 0, 0)), 10000m, "Hybrid-Supersportwagen mit kompromissloser Ferrari-DNA und extremer Performance.", "Hybrid", 1000, "/cars/ferrari_sf90.png", true, false, "München", 28, "SF90 Stradale", 2199m, 2, "ferrari-sf90-stradale", "Automatik", 2024 },
                    { new Guid("9fdeca3b-b9dc-4b15-90f9-5f4e47cb843e"), null, "Audi", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(714), new TimeSpan(0, 0, 0, 0, 0)), 4000m, "High-Performance-Kombi mit Raum, Komfort und massiver Leistung.", "Benzin", 630, "/cars/audi_rs6.png", true, false, "München", 25, "RS6 Performance", 449m, 5, "audi-rs6-performance", "Automatik", 2024 },
                    { new Guid("c17af4c8-bc9c-4b72-a902-d3e603ff3a32"), null, "Lamborghini", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(700), new TimeSpan(0, 0, 0, 0, 0)), 7500m, "Emotionaler V10-Supersportwagen mit maximaler Präsenz und Sound.", "Benzin", 640, "/cars/lamborghini_huracan.png", true, false, "München", 28, "Huracán EVO", 1299m, 2, "lamborghini-huracan-evo", "Automatik", 2023 },
                    { new Guid("edaf61bd-00f5-42f7-a086-2c6dde31cf3d"), null, "Mercedes-AMG", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 712, DateTimeKind.Unspecified).AddTicks(7885), new TimeSpan(0, 0, 0, 0, 0)), 2500m, "Elegantes Coupe mit AMG-Performance, Allrad und komfortabler Langstreckenausstattung.", "Benzin", 449, "/cars/mercedes_cle.png", true, false, "München", 25, "CLE 53 4MATIC+", 279m, 4, "mercedes-amg-cle-53-4matic", "Automatik", 2025 },
                    { new Guid("fbcce759-b8f9-433d-b75d-419024d79d7d"), null, "Porsche", new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(717), new TimeSpan(0, 0, 0, 0, 0)), 5000m, "Sportlicher Luxus-SUV mit enormer Leistung und hochwertigem Innenraum.", "Benzin", 659, "/cars/porsche_cayenne.png", true, false, "München", 25, "Cayenne Turbo GT", 649m, 5, "porsche-cayenne-turbo-gt", "Automatik", 2024 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_CarId_PickupAt_DropoffAt",
                table: "Bookings",
                columns: new[] { "CarId", "PickupAt", "DropoffAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CarBlocks_CarId_StartAt_EndAt",
                table: "CarBlocks",
                columns: new[] { "CarId", "StartAt", "EndAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_Slug",
                table: "Cars",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "CarBlocks");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
