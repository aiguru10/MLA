# MLA Tutorial - File Organization Structure

## 📁 Directory Structure

```
src/
├── index.html                          # Main application entry point
├── README.md                           # General documentation
├── README-STRUCTURE.md                 # This file - structure documentation
├── styles/                             # Legacy styles directory (preserved)
│
├── shared/                             # Shared application components
│   ├── components/                     # Reusable UI components
│   ├── styles/                         # Global styles
│   │   ├── styles.css                  # Main application styles
│   │   └── sidebar-clean.css           # Navigation sidebar styles
│   └── utils/                          # Core utilities and controllers
│       ├── app.js                      # Main application controller
│       ├── content-controller.js       # Content management controller
│       ├── navigation.js               # Navigation utilities
│       └── ui-controller.js            # UI interaction controller
│
└── domains/                            # Domain-specific content
    └── domain1/                        # Domain 1: Machine Learning Academy
        └── tasks/
            └── task1-1/                # Task 1.1: Extracting Data from AWS Storage
                └── topics/
                    ├── topic1/         # Topic 1: AWS Storage Services
                    │   ├── topic1-controller.js    # Topic 1 page controller
                    │   ├── components/              # Topic 1 interactive components
                    │   │   ├── service-analysis.js
                    │   │   ├── service-analysis-interactive.js
                    │   │   ├── interactive-puzzle.js
                    │   │   ├── puzzle-game.js
                    │   │   ├── interactive-quiz.js
                    │   │   └── quiz-controller.js
                    │   └── styles/                  # Topic 1 specific styles
                    │       ├── page-styles.css
                    │       ├── service-analysis-styles.css
                    │       ├── puzzle-styles.css
                    │       └── quiz-styles.css
                    │
                    └── topic2/         # Topic 2: Data Formats
                        ├── topic2-controller.js     # Topic 2 page controller
                        ├── components/               # Topic 2 interactive components
                        │   ├── format-analysis-interactive.js
                        │   ├── format-puzzle-game.js
                        │   └── format-selection-quiz.js
                        └── styles/                   # Topic 2 specific styles
                            ├── topic2-styles.css
                            ├── format-analysis-styles.css
                            └── format-puzzle-styles.css
```

## 🎯 Organization Principles

### **Domain-Task-Topic Hierarchy**
- **Domain**: High-level subject area (e.g., Machine Learning Academy)
- **Task**: Specific learning objective (e.g., Extracting Data from AWS Storage)
- **Topic**: Individual lessons within a task (e.g., AWS Storage Services, Data Formats)

### **Component Separation**
- **Controllers**: Page navigation and state management
- **Components**: Interactive learning elements (puzzles, quizzes, analysis tools)
- **Styles**: CSS specific to each topic's visual design

### **Shared Resources**
- **Utils**: Core application logic used across all topics
- **Styles**: Global styling and layout
- **Components**: Reusable UI elements (future expansion)

## 🔧 Class Name Updates

### **Topic Controllers**
- `PageController` → `Topic1Controller` (with backward compatibility)
- `Topic2PageController` → `Topic2Controller` (with backward compatibility)

### **Backward Compatibility**
- Old class names are still available via aliases
- Existing code continues to work without modification
- Gradual migration path for future updates

## 📦 Benefits of New Structure

### **Scalability**
- Easy to add new domains, tasks, and topics
- Clear separation of concerns
- Modular architecture

### **Maintainability**
- Related files grouped together
- Clear file naming conventions
- Reduced cognitive load when navigating codebase

### **Development Efficiency**
- Faster file location
- Easier debugging and testing
- Better code organization for team collaboration

## 🚀 Future Expansion

### **Adding New Content**
1. Create new domain/task/topic directories
2. Add controller, components, and styles
3. Update index.html with new script/style references
4. Follow established naming conventions

### **Example: Adding Domain 2**
```
domains/
├── domain1/                    # Existing ML Academy content
└── domain2/                    # New domain (e.g., Data Engineering)
    └── tasks/
        └── task2-1/            # New task
            └── topics/
                ├── topic1/     # New topic
                └── topic2/     # Another new topic
```

## 📋 Migration Notes

### **Completed**
- ✅ File reorganization complete
- ✅ HTML references updated
- ✅ Class names updated with backward compatibility
- ✅ All functionality preserved

### **Testing Required**
- 🧪 Verify all scripts load correctly
- 🧪 Test Topic 1 navigation and components
- 🧪 Test Topic 2 navigation and components
- 🧪 Confirm styling is applied correctly

This structure provides a solid foundation for scaling the MLA Tutorial platform while maintaining clean, organized, and maintainable code.
