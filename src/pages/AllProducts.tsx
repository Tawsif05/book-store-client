/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "../styles/navbar.css";
import { Input, Select, Pagination, InputNumber, Button, Spin } from "antd"; // ✅ Spin Import
import { useGetAllProductQuery } from "../redux/features/products/productApi";
import Cart from "./Cart";

const { Option } = Select;

type FilterState = {
  category?: string[];
  author?: string[];
  inStock?: string;
  priceMin?: string;
  priceMax?: string;
};

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  // Fetch Products
  const { data: products, isLoading } = useGetAllProductQuery({
    ...filters,
    search: searchTerm,
    page: currentPage.toString(),
  });

  // Unique Category & Author List
  const uniqueCategories = Array.from(
    new Set(products?.data?.result?.map((product: any) => product.category) ?? [])
  ).filter(Boolean);

  const uniqueAuthors = Array.from(
    new Set(products?.data?.result?.map((product: any) => product.author) ?? [])
  ).filter(Boolean);

  // Handle Filters
  const handleFilterChange = (values: string[]) => {
    const categoryFilters = values.filter((val) => uniqueCategories.includes(val));
    const authorFilters = values.filter((val) => uniqueAuthors.includes(val));
    const stockFilters = values.includes("inStock") ? "true" : values.includes("outOfStock") ? "false" : undefined;

    setFilters({
      category: categoryFilters.length ? categoryFilters : undefined,
      author: authorFilters.length ? authorFilters : undefined,
      inStock: stockFilters,
    });
  };

  // Handle Price Range
  const handlePriceChange = () => {
    setFilters((prev) => ({
      ...prev,
      priceMin: priceRange.min.toString(),
      priceMax: priceRange.max.toString(),
    }));
  };

  return (
    <div className="p-6 mx-10" style={{ margin: "0 50px" }}>
      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Input
          placeholder="🔍 Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 border rounded-lg"
          size="large"
        />
        <Select
          className="w-full sm:w-1/4"
          placeholder="📚 Filter by Category, Author or Stock"
          value={[...(filters.category || []), ...(filters.author || []), filters.inStock || ""]}
          onChange={handleFilterChange}
          mode="multiple"
          size="large"
          allowClear
        >
          {uniqueCategories.map((categoryName: any) => (
            <Option key={`category-${categoryName}`} value={categoryName}>
              Category: {categoryName}
            </Option>
          ))}
          {uniqueAuthors.map((authorName: any) => (
            <Option key={`author-${authorName}`} value={authorName}>
              Author: {authorName}
            </Option>
          ))}
          <Option key="inStock" value="inStock">
            In Stock
          </Option>
          <Option key="outOfStock" value="outOfStock">
            Out of Stock
          </Option>
        </Select>

        
        <div className="flex gap-2">
          <InputNumber
            min={0}
            value={priceRange.min}
            onChange={(value) => setPriceRange((prev) => ({ ...prev, min: value || 0 }))}
            className="w-full sm:w-1/4"
            placeholder="Min Price"
            size="large"
          />
          <InputNumber
            min={0}
            value={priceRange.max}
            onChange={(value) => setPriceRange((prev) => ({ ...prev, max: value || 100 }))}
            className="w-full sm:w-1/4"
            placeholder="Max Price"
            size="large"
          />
          <Button onClick={handlePriceChange} className="w-full sm:w-1/4 text-white rounded-lg outline">
            Apply Price
          </Button>
        </div>
      </div>

      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {products?.data?.result?.map((product: any) => (
            <Cart product={product} key={product._id} /> 
          ))}
        </div>
      )}

      
      <div className="flex justify-center mt-6">
        <Pagination
          current={products?.data?.meta?.page || 1}
          pageSize={products?.data?.meta?.limit || 10}
          total={products?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AllProducts;
