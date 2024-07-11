using Dapper;
using Microsoft.Data.SqlClient;
using Pract1.Models;
using System.Data;

namespace Pract1.Repo
{
    public class CarRepo : ICarRepo
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public CarRepo(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public async Task AddCar(Car car)
        {
            var parameters = new DynamicParameters();
            parameters.Add("brand", car.brand, DbType.String);
            parameters.Add("classname", car.classname, DbType.String);
            parameters.Add("modelname", car.modelname, DbType.String);
            parameters.Add("modelcode", car.modelcode, DbType.Int32);
            parameters.Add("description", car.description, DbType.String);
            parameters.Add("features", car.features, DbType.String);
            parameters.Add("price", car.price, DbType.Int32);
            parameters.Add("dom", car.dom, DbType.String);
            parameters.Add("active", car.active, DbType.Boolean);
            parameters.Add("sortorder", car.sortorder, DbType.Int32);

            using (var connection = CreateConnection())
            {
                await connection.ExecuteAsync("spAddCar", parameters, commandType: CommandType.StoredProcedure);
            }
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
        public async Task<IEnumerable<Car>> GetCars()
        {
            var query = "select * from Car";

            using (var connection = CreateConnection())
            {
                var CarList = await connection.QueryAsync<Car>(query);
                return CarList.ToList();
            }
        }
    }
}
