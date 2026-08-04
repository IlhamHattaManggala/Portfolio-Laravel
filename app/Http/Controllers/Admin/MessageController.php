<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/messages/index', [
            'messages' => Message::latest()->get()
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:messages,id'
        ]);

        Message::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.messages.index')->with('success', 'Messages deleted successfully.');
    }
}
