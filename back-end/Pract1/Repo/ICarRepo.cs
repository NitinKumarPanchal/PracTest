using Pract1.Models;

namespace Pract1.Repo
{
    public interface ICarRepo
    {
        Task<IEnumerable<Car>> GetCars();
        Task AddCar(Car car);

    }
}
