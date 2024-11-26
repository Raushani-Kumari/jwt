export const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Product Title',
      dataIndex: 'productTitle',
      key: 'productTitle',
    },
    {
      title: 'Description',
      dataIndex: 'productDescription',
      key: 'productDescription',
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
    },
    {
      title: 'Brand',
      dataIndex: 'productBrand',
      key: 'productBrand',
    },
    {
      title: 'Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
    },
    {
      title: 'Stock',
      dataIndex: 'productStock',
      key: 'productStock',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          width={100} // Set your preferred image size
          src={image.data} // Access the base64 string directly from the object
          alt="Product Image"
        />
      ),
    },
  ];