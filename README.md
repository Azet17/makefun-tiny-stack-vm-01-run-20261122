# tiny-stack-vm

A tiny stack virtual machine for make.fun's tiny stack ISA (version 1).

`main.ts` runs as `node /bot/main.ts`. For each instance `i001`..`i040` it
reads `/input/<id>/program.bin` and `/input/<id>/input.bin`, executes the
bytecode, and writes `/output/<id>/stdout.bin` plus `/output/<id>/exit.txt`.

The VM implements the full ISA: 32-bit wrapping arithmetic (`Math.imul` for
MUL), sign-extended PUSH8, signed/unsigned division and remainder with the
`INT_MIN / -1` and `x % -1` edge cases, shifts masked to 5 bits, arithmetic
vs logical right shift, signed 16-bit relative jumps, a 64-deep call stack,
256 words of memory, byte input (`IN` returns -1 past the end), decimal
`PRINT`, `PUTC`, and all eleven traps (2–11) with the step limit (1,000,000)
and output limit (65,536 bytes). A trap keeps the output written before it.
