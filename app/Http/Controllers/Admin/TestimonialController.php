<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::latest()->get()
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'is_approved' => 'sometimes|required|boolean',
            'company' => 'sometimes|required|array',
            'company.id' => 'sometimes|required|string',
            'company.en' => 'nullable|string',
            'designation' => 'sometimes|required|array',
            'designation.id' => 'sometimes|required|string',
            'designation.en' => 'nullable|string',
            'testimonial' => 'sometimes|required|array',
            'testimonial.id' => 'sometimes|required|string',
            'testimonial.en' => 'nullable|string',
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Status testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dihapus.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:testimonials,id'
        ]);

        Testimonial::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimoni berhasil dihapus.');
    }
}
