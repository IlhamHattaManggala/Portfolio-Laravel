<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $query = Certificate::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('issuer', 'like', "%{$search}%");
        }

        $certificates = $query->latest()->paginate(9)->withQueryString();

        return Inertia::render('admin/certificates/index', [
            'certificates' => $certificates,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/certificates/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'issuer' => 'required|array',
            'issuer.id' => 'required|string|max:255',
            'issuer.en' => 'required|string|max:255',
            'image' => 'required|string',
            'date_issued' => 'required|string',
        ]);

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('admin/certificates/form', [
            'certificate' => $certificate
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.id' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'issuer' => 'required|array',
            'issuer.id' => 'required|string|max:255',
            'issuer.en' => 'required|string|max:255',
            'image' => 'required|string',
            'date_issued' => 'required|string',
        ]);

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:certificates,id'
        ]);

        Certificate::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificates deleted successfully.');
    }
}
