uniform float uAmbientStrength;

#define AMBIENT_COLOR vec3(0.035, 0.026, 0.018)

vec3 applyAmbient(vec3 color) {
    return color + AMBIENT_COLOR * uAmbientStrength;
}