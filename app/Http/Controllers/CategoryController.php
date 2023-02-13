<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

use function GuzzleHttp\Promise\exception_for;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Category::orderBy('id', 'desc')->paginate(5));
    }

    public function getCategories()
    {
        return response()->json(Category::all());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3',
            'image' => 'required|image|mimes:jpg,png,jpeg'
        ]);


        $path = $request->file('image')->store('categories_image');
        try{
            $category = Category::create([
                'name' => $request->name,
                'image' => $path,
            ]);
            return response()->json($category,200);
        }catch(Throwable $th){
            return response()->json([
                'message'=>"Some error occur in saving daga",
                'error'=>$th->getMessage()
            ],500);
        }
       

      
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'min:3',
        ]);
        $path = $request->image;
        if ($request->hasFile('image')) {
            Storage::delete($category->image);
            $path = $request->file('image')->store('categories_image');
        }
        try {
            $category->update([
                'name' => $request->name,
                'image' => $path,
            ]);
            return response()->json($category,200);
        } catch (Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        Storage::delete($category->image);
        if ($category->delete()) {
            return response()->json([
                'message' => "Category delete successfully"
            ], 200);
        } else {
            return response()->json([
                'message' => "Some Error occur in deleting"
            ], 500);
        }
    }
}
