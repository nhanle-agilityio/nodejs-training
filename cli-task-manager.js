#!/usr/bin/env node

/**
 * Simple Task Manager CLI
 * A beginner-friendly command-line tool to manage tasks
 * 
 * Usage:
 *   node cli-task-manager.js add "Task description"
 *   node cli-task-manager.js list
 *   node cli-task-manager.js done <id>
 *   node cli-task-manager.js remove <id>
 *   node cli-task-manager.js clear
 */

const fs = require('fs');
const path = require('path');

// File to store tasks
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

// Helper function to colorize text
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Load tasks from file
function loadTasks() {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      const data = fs.readFileSync(TASKS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(colorize('Error loading tasks:', 'red'), err.message);
  }
  return [];
}

// Save tasks to file
function saveTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error(colorize('Error saving tasks:', 'red'), err.message);
  }
}

// Add a new task
function addTask(description) {
  if (!description) {
    console.log(colorize('⚠️  Please provide a task description!', 'yellow'));
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    description,
    done: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  
  console.log(colorize('✅ Task added successfully!', 'green'));
  console.log(`   ID: ${newTask.id}`);
  console.log(`   Task: ${newTask.description}`);
}

// List all tasks
function listTasks() {
  const tasks = loadTasks();

  if (tasks.length === 0) {
    console.log(colorize('📋 No tasks yet. Add one with:', 'blue'));
    console.log(colorize('   node cli-task-manager.js add "Your task"', 'gray'));
    return;
  }

  console.log(colorize('\n📋 Your Tasks:', 'blue'));
  console.log(colorize('─'.repeat(50), 'gray'));

  const pending = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  if (pending.length > 0) {
    console.log(colorize('\n⏳ Pending:', 'yellow'));
    pending.forEach(task => {
      console.log(`   [${task.id}] ${task.description}`);
    });
  }

  if (completed.length > 0) {
    console.log(colorize('\n✅ Completed:', 'green'));
    completed.forEach(task => {
      console.log(colorize(`   [${task.id}] ${task.description}`, 'gray'));
    });
  }

  console.log(colorize('\n─'.repeat(50), 'gray'));
  console.log(`Total: ${tasks.length} tasks (${pending.length} pending, ${completed.length} completed)`);
}

// Mark task as done
function markTaskDone(id) {
  if (!id) {
    console.log(colorize('⚠️  Please provide a task ID!', 'yellow'));
    return;
  }

  const tasks = loadTasks();
  const taskId = parseInt(id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    console.log(colorize(`❌ Task with ID ${taskId} not found!`, 'red'));
    return;
  }

  if (task.done) {
    console.log(colorize(`ℹ️  Task ${taskId} is already completed!`, 'blue'));
    return;
  }

  task.done = true;
  task.completedAt = new Date().toISOString();
  saveTasks(tasks);

  console.log(colorize('✅ Task marked as done!', 'green'));
  console.log(`   [${task.id}] ${task.description}`);
}

// Remove a task
function removeTask(id) {
  if (!id) {
    console.log(colorize('⚠️  Please provide a task ID!', 'yellow'));
    return;
  }

  const tasks = loadTasks();
  const taskId = parseInt(id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    console.log(colorize(`❌ Task with ID ${taskId} not found!`, 'red'));
    return;
  }

  const removed = tasks.splice(taskIndex, 1)[0];
  saveTasks(tasks);

  console.log(colorize('🗑️  Task removed!', 'red'));
  console.log(`   [${removed.id}] ${removed.description}`);
}

// Clear all tasks
function clearTasks() {
  const tasks = loadTasks();
  
  if (tasks.length === 0) {
    console.log(colorize('ℹ️  No tasks to clear!', 'blue'));
    return;
  }

  saveTasks([]);
  console.log(colorize(`✅ All ${tasks.length} tasks cleared!`, 'green'));
}

// Show help
function showHelp() {
  console.log(colorize('\n📝 Task Manager CLI - Help', 'blue'));
  console.log(colorize('─'.repeat(50), 'gray'));
  console.log('\nUsage:');
  console.log('  node cli-task-manager.js <command> [arguments]');
  console.log('\nCommands:');
  console.log(colorize('  add <description>', 'green') + '     Add a new task');
  console.log(colorize('  list', 'green') + '                  List all tasks');
  console.log(colorize('  done <id>', 'green') + '             Mark task as done');
  console.log(colorize('  remove <id>', 'green') + '           Remove a task');
  console.log(colorize('  clear', 'green') + '                 Remove all tasks');
  console.log(colorize('  help', 'green') + '                  Show this help');
  console.log('\nExamples:');
  console.log(colorize('  node cli-task-manager.js add "Buy groceries"', 'gray'));
  console.log(colorize('  node cli-task-manager.js list', 'gray'));
  console.log(colorize('  node cli-task-manager.js done 1', 'gray'));
  console.log(colorize('  node cli-task-manager.js remove 1', 'gray'));
  console.log(colorize('\n─'.repeat(50), 'gray'));
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const argument = args.slice(1).join(' ');

  switch (command) {
    case 'add':
      addTask(argument);
      break;
    case 'list':
      listTasks();
      break;
    case 'done':
      markTaskDone(args[1]);
      break;
    case 'remove':
    case 'rm':
      removeTask(args[1]);
      break;
    case 'clear':
      clearTasks();
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      if (!command) {
        listTasks();
      } else {
        console.log(colorize(`❌ Unknown command: ${command}`, 'red'));
        console.log('Run ' + colorize('node cli-task-manager.js help', 'blue') + ' for usage information.');
      }
  }
}

// Run the CLI
main();

