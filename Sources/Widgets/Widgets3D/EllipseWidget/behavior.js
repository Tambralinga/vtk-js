import shapeBehavior from 'vtk.js/Sources/Widgets/Widgets3D/ShapeWidget/behavior';
import { vec3 } from 'gl-matrix';

export default function widgetBehavior(publicAPI, model) {
  // We inherit shapeBehavior
  shapeBehavior(publicAPI, model);
  const superClass = { ...publicAPI };

  model.classHierarchy.push('vtkEllipseWidgetProp');

  publicAPI.setCorners = (point1, point2) => {
    if (superClass.setCorners) {
      superClass.setCorners(point1, point2);
    }

    const center = [
      0.5 * (point1[0] + point2[0]),
      0.5 * (point1[1] + point2[1]),
      0.5 * (point1[2] + point2[2]),
    ];

    const direction = [0, 0, 0];
    vec3.subtract(direction, point2, center);

    const right = model.shapeHandle.getRight();
    const up = model.shapeHandle.getUp();
    const rightComponent = vec3.dot(direction, right);
    const upComponent = vec3.dot(direction, up);

    model.shapeHandle.setOrigin(center);
    model.shapeHandle.setScale3([rightComponent, upComponent, 1]);
  };
}
