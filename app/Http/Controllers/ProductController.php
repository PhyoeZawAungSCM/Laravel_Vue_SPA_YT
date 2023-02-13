<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Product::orderBy('id','desc')->paginate(5));
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
            'category_id'=>'required',
            'name'=>'required|string|max:225',
            'image'=>'required|image|mimes:jpg,png,jpeg'
        ]);

        $path = $request->file('image')->store('product_images');
        $product = new product();
        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->image = $path;

        $product->save();
        return response()->json($product,200);
        
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
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'=>'string|max:225',
        ]);
        if($request->hasFile('image')){
            Storage::delete($product->image);
            $path = $request->file('image')->store('product_images');
            $product->update([
                'category_id'=>$request->category_id,
                'name'=>$request->name,
                'image'=>$path
            ]);
        }
        $product->update([
            'category_id'=>$request->category_id,
            'name'=>$request->name,
        ]);
  
        

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        Storage::delete($product->image);
        $product->delete();
        return response()->json([
            'message'=>'delete product successfully'
        ],200);
    }
}
