const fs = require('fs');
const file = 'app/admin/crm/pipeline/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';",
  "import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, DragEndEvent } from '@dnd-kit/core';"
);

content = content.replace(
  "const handleDragEnd = async (event: any) => {",
  "const handleDragEnd = async (event: DragEndEvent) => {"
);

fs.writeFileSync(file, content);
