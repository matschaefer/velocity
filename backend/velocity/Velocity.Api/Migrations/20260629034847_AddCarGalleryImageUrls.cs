using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Velocity.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCarGalleryImageUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GalleryImageUrls",
                table: "Cars",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("1ec7d313-3fa6-4ad2-9e5e-665316718093"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3070), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("48cef016-e349-44a1-9119-8df8cc8e70ec"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(2615), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("75cc78c0-dfef-43c0-968b-6dce7fb62d66"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3037), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("9e399b21-8b95-495d-82ed-38d38e7d4ebf"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3027), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("9fdeca3b-b9dc-4b15-90f9-5f4e47cb843e"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3076), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("c17af4c8-bc9c-4b72-a902-d3e603ff3a32"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3042), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("edaf61bd-00f5-42f7-a086-2c6dde31cf3d"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 307, DateTimeKind.Unspecified).AddTicks(9150), new TimeSpan(0, 0, 0, 0, 0)), "" });

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("fbcce759-b8f9-433d-b75d-419024d79d7d"),
                columns: new[] { "CreatedAt", "GalleryImageUrls" },
                values: new object[] { new DateTimeOffset(new DateTime(2026, 6, 29, 3, 48, 46, 308, DateTimeKind.Unspecified).AddTicks(3082), new TimeSpan(0, 0, 0, 0, 0)), "" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GalleryImageUrls",
                table: "Cars");

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("1ec7d313-3fa6-4ad2-9e5e-665316718093"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(710), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("48cef016-e349-44a1-9119-8df8cc8e70ec"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(397), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("75cc78c0-dfef-43c0-968b-6dce7fb62d66"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(696), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("9e399b21-8b95-495d-82ed-38d38e7d4ebf"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(691), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("9fdeca3b-b9dc-4b15-90f9-5f4e47cb843e"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(714), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("c17af4c8-bc9c-4b72-a902-d3e603ff3a32"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(700), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("edaf61bd-00f5-42f7-a086-2c6dde31cf3d"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 712, DateTimeKind.Unspecified).AddTicks(7885), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: new Guid("fbcce759-b8f9-433d-b75d-419024d79d7d"),
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2026, 6, 29, 2, 52, 23, 713, DateTimeKind.Unspecified).AddTicks(717), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
