import React, { useEffect, useState } from 'react';

const Category = ({name,api}) => {
    const [categories , setCategories] = useState([]);
const getCategories = async() => {
    await fetch(
        `https://api.aureal.one/public/${api}`,
        { next: { revalidate: 60 } }
      )
        .then((response) => response.json())
        .then((data) =>{ setCategories(data.allCategory)});
}
useEffect(() => {
    getCategories();
  }, []);
  console.log(name, api, "explorecards");
  console.log(categories, "expolre Categories");
  return (
    <div className=' flex justify-center  pl-16'>
      Catgeory
    </div>
  );
}

export default Category;
