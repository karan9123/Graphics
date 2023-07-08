class Cube extends cgIShape {
    constructor(a) {
        super(); // Call the constructor of the parent class
        this.makeCube(a); // Call the makeCube function to create the cube
    }

    makeCube(a) {
        // Ensure minimum size of 1 for the cube
        if (a < 1) {
            a = 1;
        }

        // Define initial positions and step size
        var d = -0.5;
        var s = -0.5;
        var t = 1 / a;
        var i = 0;

        for (i = 0; i < a; i++) {
            var h, r = i * t;

            for (h = 0; h < a; h++) {
                var n = h * t;

                // Front face
                this.addTriangle(d + n, s + r, 0.5, d + n + t, s + r, 0.5, d + n + t, s + r + t, 0.5);
                this.addNormal(0, 0, 1, 0, 0, 1, 0, 0, 1);
                this.addUV(n, r, n + t, r, n + t, r + t);

                // Back face
                this.addTriangle(d + n + t, s + r + t, 0.5, d + n, s + r + t, 0.5, d + n, s + r, 0.5);
                this.addNormal(0, 0, 1, 0, 0, 1, 0, 0, 1);
                this.addUV(n + t, r + t, n, r + t, n, r);

                // Top face
                this.addTriangle(d + n, s + r, -0.5, d + n + t, s + r + t, -0.5, d + n + t, s + r, -0.5);
                this.addNormal(0, 0, -1, 0, 0, -1, 0, 0, -1);
                this.addUV(n, r, n + t, r + t, n + t, r);

                this.addTriangle(d + n, s + r, -0.5, d + n, s + r + t, -0.5, d + n + t, s + r + t, -0.5);
                this.addNormal(0, 0, -1, 0, 0, -1, 0, 0, -1);
                this.addUV(n, r, n, r + t, n + t, r + t);

                // Left face
                this.addTriangle(-0.5, s + r, d + n, -0.5, s + r, d + n + t, -0.5, s + r + t, d + n + t);
                this.addNormal(-1, 0, 0, -1, 0, 0, -1, 0, 0);
                this.addUV(n, r, n + t, r, n + t, r + t);

                this.addTriangle(-0.5, s + r + t, d + n + t, -0.5, s + r + t, d + n, -0.5, s + r, d + n);
                this.addNormal(-1, 0, 0, -1, 0, 0, -1, 0, 0);
                this.addUV(n + t, r + t, n, r + t, n, r);

                // Right face
                this.addTriangle(0.5, s + r, d + n + t, 0.5, s + r, d + n, 0.5, s + r + t, d + n);
                this.addNormal(1, 0, 0, 1, 0, 0, 1, 0, 0);
                this.addUV(n + t, r, n, r, n, r + t);

                this.addTriangle(0.5, s + r + t, d + n, 0.5, s + r + t, d + n + t, 0.5, s + r, d + n + t);
                this.addNormal(1, 0, 0, 1, 0, 0, 1, 0, 0);
                this.addUV(n, r + t, n + t, r + t, n + t, r);

                // Bottom face
                this.addTriangle(d + n, -0.5, s + r + t, d + n + t, -0.5, s + r + t, d + n, -0.5, s + r);
                this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0);
                this.addUV(n, r + t, n + t, r + t, n, r);

                this.addTriangle(d + n, -0.5, s + r, d + n + t, -0.5, s + r + t, d + n + t, -0.5, s + r);
                this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0);
                this.addUV(n, r, n + t, r + t, n + t, r);

                // End of loop iteration
            }
        }
    }
}


class Cylinder extends cgIShape {
    constructor(a, d) {
        super(); // Call the constructor of the parent class
        this.makeCylinder(a, d); // Call the makeCylinder function to create the cylinder
    }

    makeCylinder(a, d) {
        var s = -0.5; // Base position of the cylinder along the y-axis

        // Ensure minimum values for the number of sides and height segments
        if (a < 3) {
            a = 3;
        }
        if (d < 1) {
            d = 1;
        }

        // Calculate angles and step sizes
        var t = 360 / a;
        var i = 1 / d;
        var M = 1 / a;
        var c = 1 / d;

        let h, r, n, e, o, l; // Variables for vertex positions
        var u, m, v = 360; // Variables for angle calculation

        let g, N, T, C; // Variables for temporary vertex positions

        // Generate top cap
        for (u = 0; u < a; u++) {
            // Calculate vertex positions for the current side
            h = (g = 0.5 * Math.cos(radians(v))) + 0.5;
            r = (N = 0.5 * Math.sin(radians(v))) + 0.5;
            n = (T = 0.5 * Math.cos(radians(v - t))) + 0.5;
            e = (C = 0.5 * Math.sin(radians(v - t))) + 0.5;

            // Add triangles for the current side of the top cap
            this.addTriangle(g, s, N, 0, s, 0, T, s, C);

            // Add normal vectors for the triangles (pointing downwards)
            this.addNormal(0, -1, 0, 0, -1, 0, 0, -1, 0);

            // Add UV coordinates for texture mapping
            this.addUV(h, 1 - r, 0.5, 0.5, n, 1 - e);

            // Add triangles for the adjacent side of the top cap
            this.addTriangle(T, 0.5, C, 0, 0.5, 0, g, 0.5, N);

            // Add normal vectors for the triangles (pointing upwards)
            this.addNormal(0, 1, 0, 0, 1, 0, 0, 1, 0);

            // Add UV coordinates for texture mapping
            this.addUV(n, 1 - e, 0.5, 0.5, h, 1 - r);

            v -= t; // Decrease angle for the next side
        }

        // Generate sides of the cylinder
        for (l = 1, u = 0; u < d; u++) {
            var f = u * i; // Calculate height position for the current segment

            for (v = 360, o = 1, m = 0; m < a; m++) {
                // Calculate vertex positions for the current side
                g = 0.5 * Math.cos(radians(v));
                N = 0.5 * Math.sin(radians(v));
                T = 0.5 * Math.cos(radians(v - t));
                C = 0.5 * Math.sin(radians(v - t));

                // Add triangles for the current side of the cylinder
                this.addTriangle(g, s + f, N, T, s + f, C, T, s + f + i, C);

                // Add normal vectors for the triangles
                this.addNormal(g, 0, N, T, 0, C, T, 0, C);

                // Add UV coordinates for texture mapping
                this.addUV(o, 1 - l, o - M, 1 - l, o - M, 1 - (l - c));

                // Add triangles for the adjacent side of the cylinder
                this.addTriangle(g, s + f, N, T, s + f + i, C, g, s + f + i, N);

                // Add normal vectors for the triangles
                this.addNormal(g, 0, N, T, 0, C, g, 0, N);

                // Add UV coordinates for texture mapping
                this.addUV(o, 1 - l, o - M, 1 - (l - c), o, 1 - (l - c));

                v -= t; // Decrease angle for the next side
                o -= M; // Decrease UV coordinate for the next side
            }

            l -= c; // Decrease UV coordinate for the next segment
        }
    }
}


class Cone extends cgIShape {
    constructor(a, d) {
        super(); // Call the constructor of the parent class
        this.makeCone(a, d); // Call the makeCone function to create the cone
    }

    makeCone(a, d) {
        let s = -0.5; // Base position of the cone along the y-axis

        // Ensure minimum values for the number of sides and height segments
        if (a < 3) {
            a = 3;
        }
        if (d < 1) {
            d = 1;
        }

        // Calculate angles and step sizes
        let t = 360 / a;
        let i = 1 / d;
        let S = 1 / a;
        let x = 1 / d;
        let I = 0.5 / d;

        var h, r, n, e, o, l, M, c, u, m, v, g, N, T, C; // Variables for vertex positions
        var f = 360; // Initial angle value for calculations

        let p, k; // Variables for temporary vertex positions

        // Generate top cap
        for (p = 0, r = 0; r < a; r++) {
            // Calculate vertex positions for the current side
            n = I * Math.cos(radians(f));
            o = I * Math.sin(radians(f));
            M = 0;
            c = 0.5;
            u = 0;
            m = e = I * Math.cos(radians(f - t));
            v = 0.5 - i;
            g = l = I * Math.sin(radians(f - t));
            N = n;
            T = 0.5 - i;
            C = o;

            // Add triangles for the current side of the top cap
            this.addTriangle(M, c, u, m, v, g, N, T, C);

            // Add normal vectors for the triangles
            this.addConeNormal(M, c, u, m, v, g, N, T, C);

            // Add UV coordinates for texture mapping
            this.addUV(0, 0, p + S, x, p, x);

            // Calculate vertex positions for the adjacent side of the top cap
            n = 0.5 * Math.cos(radians(f));
            o = 0.5 * Math.sin(radians(f));
            M = 0;
            c = s;
            u = 0;
            m = e = 0.5 * Math.cos(radians(f - t));
            v = s;
            g = l = 0.5 * Math.sin(radians(f - t));
            N = n;
            T = s;
            C = o;

            // Add triangles for the adjacent side of the top cap
            this.addTriangle(M, c, u, m, v, g, N, T, C);

            // Add normal vectors for the triangles (pointing downwards)
            this.addConeNormal(0, -1, 0, 0, -1, 0, 0, -1, 0);

            // Add UV coordinates for texture mapping
            this.addUV(0.5, 0.5, e + 0.5, 1 - (l + 0.5), n + 0.5, 1 - (o + 0.5));

            f -= t; // Decrease angle for the next side
            p += S; // Increase UV coordinate for the next side
        }

        // Generate sides of the cone
        for (k = 1, h = 0; h < d; h++) {
            let d = h * i; // Calculate height position for the current segment
            let n = h; // Variable to calculate UV coordinates for each segment
            let e = 360; // Initial angle value for each segment

            for (p = 0, r = 0; r < a; r++) {
                Math.cos(radians(e));
                Math.sin(radians(e));
                Math.cos(radians(e - t));
                Math.sin(radians(e - t));

                let a = 0.5 * (1 - n * i);
                let h = a * Math.cos(radians(e));
                let r = a * Math.sin(radians(e));
                let o = a * Math.cos(radians(e - t));
                let l = a * Math.sin(radians(e - t));

                let f = 0.5 * (1 - (n + 1) * i);
                let I = f * Math.cos(radians(e));
                let b = f * Math.sin(radians(e));
                let q = f * Math.cos(radians(e - t));
                let y = f * Math.sin(radians(e - t));

                a = f;

                M = o;
                c = s + d;
                u = l;
                m = I;
                v = s + d + i;
                g = b;
                N = h;
                T = s + d;
                C = r;

                // Add triangles for the current side of the cone
                this.addTriangle(M, c, u, m, v, g, N, T, C);

                // Add normal vectors for the triangles
                this.addConeNormal(M, c, u, m, v, g, N, T, C);

                // Add UV coordinates for texture mapping
                this.addUV(p + S, 1 - k, p, 1 - (k - x), p, 1 - k);

                M = o;
                c = s + d;
                u = l;
                m = q;
                v = s + d + i;
                g = y;
                N = I;
                T = s + d + i;
                C = b;

                // Add triangles for the adjacent side of the cone
                this.addTriangle(M, c, u, m, v, g, N, T, C);

                // Add normal vectors for the triangles
                this.addConeNormal(M, c, u, m, v, g, N, T, C);

                // Add UV coordinates for texture mapping
                this.addUV(p + S, 1 - k, p + S, 1 - (k - x), p, 1 - (k - x));

                e -= t; // Decrease angle for the next side
                p += S; // Increase UV coordinate for the next side
            }

            k -= x; // Decrease UV coordinate for the next segment
        }
    }

    addConeNormal(a, d, s, t, i, h, r, n, e) {
        let o = 2 * a;
        let l = 0.5;
        let M = 2 * s;
        let c = Math.sqrt(o * o + l * l + M * M);
        o /= c;
        l /= c;
        M /= c;

        let u = 2 * t;
        let m = 0.5;
        let v = 2 * h,
        g = Math.sqrt(u * u + m * m + v * v);
        u /= g;
        m /= g;
        v /= g;
        let N = 2 * r;
        let T = .5;
        let C = 2 * e;
        let f = Math.sqrt(N * N + T * T + C * C);
        N /= f;
        T /= f;
        C /= f;
        this.addNormal(o, l, M, u, m, v, N, T, C);
    }
}


class Sphere extends cgIShape {
    constructor(a, d) {
        super(); // Call the constructor of the parent class
        this.makeSphere(a, d); // Call the makeSphere function to create the sphere
    }

    makeSphere(a, d) {
        let s, t, i, h, r, n, e, o, l, M, c, u, m, v, g; // Variables for vertex positions

        // Ensure minimum values for the number of longitude and latitude segments
        if (a < 3) {
            a = 3;
        }
        if (d < 3) {
            d = 3;
        }

        let N = 6.28 / a; // Angle step size for longitude segments
        let T = 3.14 / d; // Angle step size for latitude segments
        let C = 1 / a; // UV step size for longitude segments
        let f = 1 / d; // UV step size for latitude segments

        let p = T; // Initial angle value for latitude segments
        let k = 0; // Variable for temporary vertex positions
        let S = 0; // Variable for temporary vertex positions
        let x = 1; // Variable for temporary vertex positions
        let I = 0; // Variable for temporary vertex positions
        let b = 0; // Variable for temporary vertex positions

        let q = Math.sin(T); // Pre-computed sine value for latitude segments
        let y = Math.cos(T); // Pre-computed cosine value for latitude segments

        let j = 0.5; // Initial UV coordinate for the top vertex
        let w = 0.5 * y; // Initial UV coordinate for the top vertex

        var z, A; // Variables for temporary vertex positions

        // Generate top cap
        for (I = 1, A = 0; A < a; A++) {
            b = 0;

            // Calculate vertex positions for the current longitude segment
            let a = Math.sin(k);
            let d = Math.cos(k);
            let T = Math.sin(k + N);

            s = 0;
            t = 0.5;
            i = 0;

            M = 0;
            c = 0;
            n = Math.cos(k + N) * q * 0.5;
            r = w;
            h = T * q * 0.5;

            u = I - C;
            m = b + f;
            l = d * q * 0.5;
            o = w;
            e = a * q * 0.5;
            v = I;
            g = b + f;

            // Add triangles for the current longitude segment of the top cap
            this.addTriangle(s, t, i, e, o, l, h, r, n);

            // Add normal vectors for the triangles
            this.addNormal(s, t, i, e, o, l, h, r, n);

            // Add UV coordinates for texture mapping
            this.addUV(M, c, v, g, u, m);

            k += N; // Increase angle for the next longitude segment
            I -= C; // Decrease UV coordinate for the next longitude segment
        }

        // Generate middle segments of the sphere
        for (b = f, z = 1; z < d; z++) {
            for (S = Math.sin(p), x = Math.cos(p), q = Math.sin(p + T), j = 0.5 * x, w = 0.5 * Math.cos(p + T), k = 0, I = 1, A = 0; A <= a; A++) {
                let a = Math.sin(k);
                let d = Math.cos(k);
                let T = Math.sin(k + N);
                let p = Math.cos(k + N);

                i = d * S * 0.5;
                t = j;
                s = a * S * 0.5;
                M = I;
                c = b;
                n = p * S * 0.5;
                r = j;
                h = T * S * 0.5;
                u = I - C;
                m = b;
                l = d * q * 0.5;
                o = w;
                e = a * q * 0.5;
                v = I;
                g = b + f;

                // Add triangles for the current segment of the sphere
                this.addTriangle(e, o, l, h, r, n, s, t, i);

                // Add normal vectors for the triangles
                this.addNormal(e, o, l, h, r, n, s, t, i);

                // Add UV coordinates for texture mapping
                this.addUV(1 - v, 1 - g, 1 - u, 1 - m, 1 - M, 1 - c);

                i = p * S * 0.5;
                t = j;
                s = T * S * 0.5;
                M = I - C;
                c = b;
                n = p * q * 0.5;
                r = w;
                h = T * q * 0.5;
                u = I - C;
                m = b + f;
                l = d * q * 0.5;
                o = w;
                e = a * q * 0.5;
                v = I;
                g = b + f;

                // Add triangles for the adjacent segment of the sphere
                this.addTriangle(s, t, i, e, o, l, h, r, n);

                // Add normal vectors for the triangles
                this.addNormal(s, t, i, e, o, l, h, r, n);

                // Add UV coordinates for texture mapping
                this.addUV(1 - M, 1 - c, 1 - v, 1 - g, 1 - u, 1 - m);

                k += N; // Increase angle for the next longitude segment
                I -= C; // Decrease UV coordinate for the next longitude segment
            }

            p += T; // Increase angle for the next latitude segment
            b += f; // Increase UV coordinate for the next latitude segment
        }

        // Generate bottom cap
        for (I = 1, b = 1, k = 0, S = Math.sin(p), q = 0, y = -1, j = 0.5 * Math.cos(p), w = -0.5, A = 0; A < a; A++) {
            let a = Math.sin(k);
            let d = Math.cos(k);
            let T = Math.sin(k + N);

            i = d * S * 0.5;
            t = w;
            s = a * S * 0.5;
            M = I;
            c = b;
            n = Math.cos(k + N) * S * 0.5;
            r = w;
            h = T * S * 0.5;
            u = I - C;
            m = b;
            l = 0;
            o = -0.5;
            e = 0;
            v = 1;
            g = 1;
            this.addTriangle(s, t, i, e, o, l, h, r, n);
            this.addNormal(s, t, i, e, o, l, h, r, n);
            this.adduv(M, c, v, g, u, m);
            k += N;
            I -= C;
        }
    }
}
