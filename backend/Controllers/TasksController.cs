using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    // In-memory list to store tasks (temporary storage)
    private static List<TaskList> tasks = new List<TaskList>();
    private static int nextId = 1;

    // GET: api/tasks
    [HttpGet]
    public ActionResult<IEnumerable<Task>> GetTasks()
    {
        return Ok(tasks);
    }

    // POST: api/tasks
    [HttpPost]
    public ActionResult<Task> AddTask(TaskList newtask)
    {
        newtask.Id = nextId++;
        tasks.Add(newtask);
        return Ok(newtask);
    }

    // DELETE: api/tasks/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
        {
            return NotFound();
        }

        tasks.Remove(task);
        return NoContent();
    }
}