package app.splitwise.controllers;

import app.splitwise.dtos.CreateEvenExpenseRequestBody;
import app.splitwise.dtos.CreateUnevenExpenseRequestBody;
import app.splitwise.entities.ExpenseSplit;
import app.splitwise.services.ExpenseService;
import app.splitwise.services.ExpenseSplitService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private ExpenseSplitService expenseSplitService;

    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody @Valid CreateEvenExpenseRequestBody payload) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(expenseService.addExpense(payload));
    }

    @PostMapping("/uneven")
    public ResponseEntity<?> addUnevenExpense(@RequestBody @Valid CreateUnevenExpenseRequestBody payload) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(expenseService.addUnevenExpense(payload));
    }

    @GetMapping("/myContribution")
    public ResponseEntity<?> contribution(@RequestParam Long paidBy, @RequestParam Long groupId) {
        return ResponseEntity.ok(expenseService.myContribution(paidBy, groupId));
    }

    @GetMapping("/net-balances")
    public ResponseEntity<?> getNetBalances(@RequestParam Long userId, @RequestParam Long groupId) {
        return ResponseEntity.ok(expenseSplitService.calculateNetBalances(userId, groupId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpenseSplit(@PathVariable Long id, @RequestBody ExpenseSplit updatedSplit) {
        ExpenseSplit result = expenseSplitService.updateExpenseSplit(id, updatedSplit);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> getExpensesByGroupId(@PathVariable Long groupId) {
        return ResponseEntity.ok(expenseService.getExpensesByGroupId(groupId));
    }
    // GET /api/groups/{groupId}/balances/owe?userId=123
    @GetMapping("/owe/{groupId}")
    public ResponseEntity<?> getGroupWiseAmountsIOwe(
            @PathVariable @Min(1) Long groupId,
            @RequestParam @Min(1) Long userId
    ) {
        return ResponseEntity.ok(expenseSplitService.getGroupWiseAmountsIOwe(userId, groupId));
    }

    // GET /api/groups/{groupId}/balances/owed-to-me?userId=123
    @GetMapping("/owed-to-me/P{groupId}")
    public ResponseEntity<?> getGroupWiseAmountsOwedToMe(
            @PathVariable @Min(1) Long groupId,
            @RequestParam @Min(1) Long userId
    ) {
        return ResponseEntity.ok(expenseSplitService.getGroupWiseAmountsOwedToMe(userId, groupId));
    }
    @GetMapping("/net")
    public ResponseEntity<?> getGroupWiseNetWithCounterparties(
            @RequestParam @Min(1) Long groupId,
            @RequestParam @Min(1) Long userId
    ) {
        return ResponseEntity.ok(expenseSplitService.getGroupWiseNetWithCounterparties(userId, groupId));
    }
}
