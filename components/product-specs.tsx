// components/product-specs.tsx
import React from 'react';

type Spec = {
  spec_value: string;
  spec_unit: string | undefined;
  spec_label: string;
}

type ProductSpecsProps = {
  specs: Spec[];
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  return (
    <div className='product-specs-container'>
      <ul className='product-specs-list'>
        {specs.map((spec, index) => (
          <li className='product-spec-block' key={index}>
            <div className='product-spec-val-unit-group'>
              <div className="spec-value">{spec.spec_value}</div>
              <div className="spec-unit">{spec.spec_unit}</div>
            </div>
            <div className="spec-label">{spec.spec_label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecs;
