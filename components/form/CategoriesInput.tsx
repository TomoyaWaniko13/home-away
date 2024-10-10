import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { categories, CategoryLabel } from '@/utils/categories';

// 89. Categories Input

const name = 'category';

const CategoriesInput = ({ defaultValue }: { defaultValue?: CategoryLabel }) => {
  return (
    <div>
      <Label htmlFor={name} className={'capitalize'}>
        Categories
      </Label>
      <Select defaultValue={defaultValue || categories[0].label} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            return (
              <SelectItem key={category.label} value={category.label}>
                <span className={'flex items-center gap-2'}>
                  <category.icon />
                  {category.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoriesInput;
