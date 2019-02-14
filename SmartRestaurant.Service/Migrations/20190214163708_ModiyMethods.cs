using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Service.Migrations
{
    public partial class ModiyMethods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PaymentMethods",
                maxLength: 45,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 25);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "PaymentMethods",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 45);
        }
    }
}
