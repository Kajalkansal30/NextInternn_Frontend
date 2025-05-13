import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, 
  FiX,
  FiMove,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.3,
      staggerChildren: 0.08,
      when: "beforeChildren"
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    } 
  },
  exit: { opacity: 0, x: 10 }
};

// Sortable filter item component
const SortableFilterItem = ({ id, filterType, filterOptions, selectedValues, toggleSelection, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isItemDragging ? 1 : 0,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      variants={itemVariants}
      className={`bg-gray-50 rounded-lg p-3 border ${
        isItemDragging ? 'border-blue-300 shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700 text-sm uppercase tracking-wider">
          {filterType}
        </h3>
        <div 
          {...attributes}
          {...listeners}
          className={`text-gray-400 hover:text-gray-600 p-1 ${
            isItemDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <FiMove size={16} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterOptions[filterType].map((item, idx) => {
          const isSelected = selectedValues[filterType]?.includes(item) || false;
          return (
            <motion.button
              key={`${filterType}-${idx}`}
              type="button"
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => toggleSelection(filterType, item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isDragging}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

const FilterCard = ({ filterOptions }) => {
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = useState({});
  const [filterOrder, setFilterOrder] = useState(Object.keys(filterOptions || {}));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  const toggleSelection = (filterType, value) => {
    setSelectedValues((prev) => {
      const currentValues = prev[filterType] || [];
      const isSelected = currentValues.includes(value);

      let newSelectedValues;
      if (isSelected) {
        const newValues = currentValues.filter((v) => v !== value);
        if (newValues.length === 0) {
          const { [filterType]: _, ...rest } = prev;
          newSelectedValues = rest;
        } else {
          newSelectedValues = { ...prev, [filterType]: newValues };
        }
      } else {
        newSelectedValues = { ...prev, [filterType]: [...currentValues, value] };
      }
      
      dispatch(setSearchedQuery(newSelectedValues));
      return newSelectedValues;
    });
  };

  const clearAllFilters = (e) => {
    e.stopPropagation();
    setSelectedValues({});
    dispatch(setSearchedQuery({}));
  };

  useEffect(() => {
    setFilterOrder(Object.keys(filterOptions || {}));
  }, [filterOptions]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    setFilterOrder((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (!filterOptions) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-3">
          <FiFilter className="text-blue-600" size={18} />
          <h3 className="font-semibold text-gray-800">Filters</h3>
          {Object.keys(selectedValues).length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              {Object.values(selectedValues).flat().length}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {Object.keys(selectedValues).length > 0 && (
            <button 
              className="text-gray-500 hover:text-red-500 transition-colors p-1"
              onClick={clearAllFilters}
              aria-label="Clear all filters"
              title="Clear all filters"
            >
              <FiX size={18} />
            </button>
          )}
          <motion.span 
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            {isCollapsed ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
          </motion.span>
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { 
                opacity: 1, 
                height: 'auto',
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 }
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">
              {isBrowser ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <motion.div
                    variants={filterVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <SortableContext
                      items={filterOrder}
                      strategy={verticalListSortingStrategy}
                    >
                      {filterOrder.map((filterType) => (
                        <SortableFilterItem
                          key={filterType}
                          id={filterType}
                          filterType={filterType}
                          filterOptions={filterOptions}
                          selectedValues={selectedValues}
                          toggleSelection={toggleSelection}
                          isDragging={isDragging}
                        />
                      ))}
                    </SortableContext>
                  </motion.div>
                </DndContext>
              ) : (
                <motion.div
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {filterOrder.map((filterType) => (
                    <motion.div
                      key={filterType}
                      variants={itemVariants}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                    >
                      <h3 className="font-medium text-gray-700 text-sm uppercase tracking-wider mb-2">
                        {filterType}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions[filterType].map((item, idx) => {
                          const isSelected = selectedValues[filterType]?.includes(item) || false;
                          return (
                            <motion.button
                              key={`${filterType}-${idx}`}
                              type="button"
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                isSelected
                                  ? 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                              }`}
                              onClick={() => toggleSelection(filterType, item)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {item}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterCard;