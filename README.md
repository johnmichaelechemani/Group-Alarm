tailwind links:  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
<script src="https://cdn.tailwindcss.com"></script>
<style type="text/tailwindcss">
      @theme {
        --color-clifford: #da373d;
      }
    </style>

#extensions
Auto Rename Tag
Prettier - Code formatter
ReSharper
Code Spell Checker
HTML CSS Support
Tailwind CSS IntelliSense
    
# docs in asp.net from claude

// 1. First, create a model class (Student.cs)
using System;
using System.ComponentModel.DataAnnotations;

namespace YourApp.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Course { get; set; }

        [DataType(DataType.Date)]
        public DateTime EnrollmentDate { get; set; }
    }
}

// 2. Create DbContext (ApplicationDbContext.cs)
using Microsoft.EntityFrameworkCore;

namespace YourApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}

// 3. Controller with CRUD operations (StudentsController.cs)
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using YourApp.Data;
using YourApp.Models;

namespace YourApp.Controllers
{
    public class StudentsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Students
        public async Task<IActionResult> Index()
        {
            return View(await _context.Students.ToListAsync());
        }

        // GET: Students/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .FirstOrDefaultAsync(m => m.Id == id);
            
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // GET: Students/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Students/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,Email,Course,EnrollmentDate")] Student student)
        {
            if (ModelState.IsValid)
            {
                _context.Add(student);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        // GET: Students/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        // POST: Students/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Email,Course,EnrollmentDate")] Student student)
        {
            if (id != student.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(student);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StudentExists(student.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(student);
        }

        // GET: Students/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var student = await _context.Students
                .FirstOrDefaultAsync(m => m.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var student = await _context.Students.FindAsync(id);
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }
    }
}


<!-- Index.cshtml -->
@model IEnumerable<YourApp.Models.Student>

<h2>Students List</h2>

<p>
    <a asp-action="Create" class="btn btn-primary">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>@Html.DisplayNameFor(model => model.Name)</th>
            <th>@Html.DisplayNameFor(model => model.Email)</th>
            <th>@Html.DisplayNameFor(model => model.Course)</th>
            <th>@Html.DisplayNameFor(model => model.EnrollmentDate)</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model)
        {
            <tr>
                <td>@Html.DisplayFor(modelItem => item.Name)</td>
                <td>@Html.DisplayFor(modelItem => item.Email)</td>
                <td>@Html.DisplayFor(modelItem => item.Course)</td>
                <td>@Html.DisplayFor(modelItem => item.EnrollmentDate)</td>
                <td>
                    <a asp-action="Edit" asp-route-id="@item.Id" class="btn btn-warning">Edit</a>
                    <a asp-action="Details" asp-route-id="@item.Id" class="btn btn-info">Details</a>
                    <a asp-action="Delete" asp-route-id="@item.Id" class="btn btn-danger">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>

<!-- Create.cshtml -->
@model YourApp.Models.Student

<h2>Create Student</h2>

<form asp-action="Create">
    <div class="form-group">
        <label asp-for="Name" class="control-label"></label>
        <input asp-for="Name" class="form-control" />
        <span asp-validation-for="Name" class="text-danger"></span>
    </div>
    <div class="form-group">
        <label asp-for="Email" class="control-label"></label>
        <input asp-for="Email" class="form-control" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>
    <div class="form-group">
        <label asp-for="Course" class="control-label"></label>
        <input asp-for="Course" class="form-control" />
        <span asp-validation-for="Course" class="text-danger"></span>
    </div>
    <div class="form-group">
        <label asp-for="EnrollmentDate" class="control-label"></label>
        <input asp-for="EnrollmentDate" class="form-control" />
        <span asp-validation-for="EnrollmentDate" class="text-danger"></span>
    </div>
    <div class="form-group">
        <input type="submit" value="Create" class="btn btn-primary" />
    </div>
</form>


To set up the database connection and Entity Framework, you'll need to:

Install required NuGet packages:
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools

Add the connection string in appsettings.json:

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=YourAppDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}

Configure the database context in Program.cs:

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

Create and apply the migration:

Add-Migration InitialCreate
Update-Database
