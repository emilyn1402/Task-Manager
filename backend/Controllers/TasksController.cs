using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Data;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    // Dependency injection of the database context
    private readonly AppDbContext _context;

    // Constructor to initialize the database context
    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tasks
    // Asynchronously fetch all tasks from the database
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskList>>> GetTasks()
    {
        // Fetch all tasks from the database and return them as a list
        return Ok(await _context.Tasks.ToListAsync());
    }

    // POST: api/tasks
    // Asynchronously add a new task to the database
    [HttpPost]
    public async Task<ActionResult<TaskList>> AddTask(TaskList newtask)
    {
        _context.Tasks.Add(newtask);
        await _context.SaveChangesAsync();
        return Ok(newtask);
    }

    // DELETE: api/tasks/{id}
    // Asynchronously delete a task by ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // PUT: api/tasks/{id}
    // Asynchronously update a task by ID
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, TaskList updatedTask)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            return NotFound();
        }

        task.Title = updatedTask.Title;
        task.Completed = updatedTask.Completed;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}