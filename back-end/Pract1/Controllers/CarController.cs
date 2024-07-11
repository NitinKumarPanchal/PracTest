using Microsoft.AspNetCore.Mvc;
using Pract1.Models;
using Pract1.Repo;

namespace Pract1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : Controller
    {
        public ICarRepo _CarRepository;

        public CarController(ICarRepo CarRepository)
        {
            _CarRepository = CarRepository;
        }

        [HttpGet(nameof(GetCars))]
        public async Task<IEnumerable<Car>> GetCars()
        {
            var cars = await _CarRepository.GetCars();
            return cars;
        }
        [HttpPost(nameof(AddCar))]
        public async Task AddCar(Car cart)
        {
            await _CarRepository.AddCar(cart);
        }
    }
}
