using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // /api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // /api/activities/0000-0000-0000
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var result = await _context.Activities.FindAsync(id);

            if (result == null)
                return NotFound();

            return result;
        }

    }
}