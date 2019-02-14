using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartRestaurant.Service.Migrations
{
    public partial class ModifyOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderName",
                table: "Orders",
                maxLength: 35,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 25);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderName",
                table: "Orders",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 35);
        }
    }
}
