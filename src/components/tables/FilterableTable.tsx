
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface FilterableTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  expandedRowRender?: (row: any) => React.ReactNode;
}

const FilterableTable: React.FC<FilterableTableProps> = ({
  columns,
  data,
  onRowClick,
  expandedRowRender
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        
        const rowValue = String(row[key] || '').toLowerCase();
        return rowValue.includes(filterValue.toLowerCase());
      });
    });
  }, [data, filters]);

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Handle column sort
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle row click and expand
  const handleRowClick = (row: any, index: number) => {
    if (expandedRowRender) {
      setExpandedRows(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
    
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className="table-container">
      <table className="min-w-full divide-y divide-gray-200 quant-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className="whitespace-nowrap">
                <div className="flex items-center justify-between mb-2">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <button
                      className="ml-1 p-1 rounded hover:bg-gray-100"
                      onClick={() => handleSort(column.key)}
                    >
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      ) : '↕'}
                    </button>
                  )}
                </div>
                <div className="flex items-center border rounded-md bg-white">
                  <div className="pl-2 text-gray-400">
                    <Search size={16} />
                  </div>
                  <Input
                    placeholder={`Filter ${column.header.toLowerCase()}`}
                    value={filters[column.key] || ''}
                    onChange={e => handleFilterChange(column.key, e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr 
                  className={`cursor-pointer ${expandedRows[rowIndex] ? 'bg-gray-50' : ''}`}
                  onClick={() => handleRowClick(row, rowIndex)}
                >
                  {columns.map(column => (
                    <td key={`${rowIndex}-${column.key}`} className="whitespace-nowrap">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
                {expandedRowRender && expandedRows[rowIndex] && (
                  <tr>
                    <td colSpan={columns.length} className="px-0 py-0 border-b-0">
                      <div className="px-4 py-3 bg-gray-50">
                        {expandedRowRender(row)}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilterableTable;
