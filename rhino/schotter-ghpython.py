import Rhino.Geometry as rg
import random
import math

# Create an empty list to store the rectangles
rectangles = []

# Create a nested loop for rows and columns to draw the rectangles
for row in range(rows):
    for col in range(columns):
        # Calculate the bottom-left corner of the rectangle
        bottom_left = rg.Point3d(col * unit_size, (rows - row - 1) * unit_size, 0)

        # Create a rectangle with the specified size
        rectangle = rg.Rectangle3d(rg.Plane.WorldXY, unit_size, unit_size)

        # Calculate the rotation angle, randomizing it more as we go down the rows
        rotation = random.uniform(-max_rotation, max_rotation) * (row / float(rows - 1))

        # Create and apply rotation transformation
        rotation_transform = rg.Transform.Rotation(math.radians(rotation), rg.Vector3d.ZAxis, rg.Point3d.Origin)
        rectangle.Transform(rotation_transform)

        # Calculate the displacement based on the current row
        displacement_x = random.uniform(-unit_size, unit_size) * max_displacement_ratio * (row / float(rows - 1))
        displacement_y = random.uniform(-unit_size, unit_size) * max_displacement_ratio * (row / float(rows - 1))

        # Create and apply translation transformation
        translation_transform = rg.Transform.Translation(rg.Vector3d(bottom_left) + rg.Vector3d(displacement_x, displacement_y, 0))
        rectangle.Transform(translation_transform)

        # Append the rectangle to the rectangles list
        rectangles.append(rectangle)

# Output the rectangles
a = rectangles
