// This file will handle all requests to /api/tasks
export async function onRequest(context) {
  // context contains the request, environment variables, etc.
  const { request, env } = context;

  // This is our connection to the D1 database.
  // The binding "DB" must be configured in the Cloudflare dashboard.
  const db = env.DB;

  // For now, we'll pretend we have a logged-in user with ID 1.
  // Later, this would come from a real authentication system.
  const userId = 1;

  try {
    // Use the request method to determine the action (GET, POST, PUT, DELETE)
    if (request.method === "GET") {
      // --- FETCH all tasks for the user ---
      const stmt = db.prepare("SELECT * FROM tasks WHERE user_id = ?").bind(userId);
      const { results } = await stmt.all();
      return Response.json(results);
    }

    if (request.method === "POST") {
      // --- CREATE a new task ---
      const newTask = await request.json(); // Get data from the frontend
      if (!newTask.text) {
        return new Response("Task text is required", { status: 400 });
      }
      const stmt = db.prepare("INSERT INTO tasks (text, user_id) VALUES (?, ?)")
                     .bind(newTask.text, userId);
      await stmt.run();
      return new Response("Task created successfully", { status: 201 });
    }

    if (request.method === "PUT") {
      // --- UPDATE an existing task (e.g., mark complete, edit text) ---
      const url = new URL(request.url);
      const taskId = url.searchParams.get("id"); // Get task ID from URL: /api/tasks?id=123
      const updatedTask = await request.json(); // Get updated data from frontend

      if (!taskId) {
        return new Response("Task ID is required", { status: 400 });
      }

      const stmt = db.prepare("UPDATE tasks SET text = ?, completed = ? WHERE id = ? AND user_id = ?")
                     .bind(updatedTask.text, updatedTask.completed ? 1 : 0, taskId, userId);
      await stmt.run();
      return new Response("Task updated successfully", { status: 200 });
    }

    if (request.method === "DELETE") {
        // --- DELETE a task ---
        const url = new URL(request.url);
        const taskId = url.searchParams.get("id"); // Get ID from URL
        if (!taskId) {
            return new Response("Task ID is required", { status: 400 });
        }
        const stmt = db.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?")
                       .bind(taskId, userId);
        await stmt.run();
        return new Response("Task deleted successfully", { status: 200 });
    }

    // If the method is not supported
    return new Response("Method not allowed", { status: 405 });

  } catch (error) {
    console.error(error);
    return new Response("An internal server error occurred", { status: 500 });
  }
}
