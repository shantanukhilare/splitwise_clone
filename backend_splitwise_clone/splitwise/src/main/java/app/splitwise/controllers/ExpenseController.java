package app.splitwise.controllers;

import app.splitwise.dtos.CreateEvenExpenseRequestBody;
import app.splitwise.dtos.CreateUnevenExpenseRequestBody;
import app.splitwise.services.ExpenseService;
import app.splitwise.services.ExpenseSplitService;
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

    @PostMapping()
    ResponseEntity<?> addExpense(@RequestBody CreateEvenExpenseRequestBody payload){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addExpense(payload));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new RuntimeException("something went wrong..."));
        }
    }

    @PostMapping("/uneven")
    ResponseEntity<?> addUnevenExpense(@RequestBody CreateUnevenExpenseRequestBody payload){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addUnevenExpense(payload));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new RuntimeException("something went wrong..."));
        }
    }

    @GetMapping("/myContribution/{paidBy}/{groupId}")
    ResponseEntity<?> contribution(@RequestParam Long paidBy, @RequestParam Long groupId){
        try{
            return ResponseEntity.ok(expenseService.myContribution(paidBy, groupId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new RuntimeException("something went wrong..."));
        }
    }

    @GetMapping("/whoYouOwe/{userId}/{groupId}")
    ResponseEntity<?> whoYouOwe(@RequestParam Long userId, @RequestParam Long groupId){
        try{
            return ResponseEntity.ok(expenseSplitService.whoYouOwe(userId, groupId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new RuntimeException("something went wrong..."));
        }
    }
    @GetMapping("/WhoOwesYou/{userId}/{groupId}")
    ResponseEntity<?> WhoOwesYou(@RequestParam Long userId, @RequestParam Long groupId){
        try{
            return ResponseEntity.ok(expenseSplitService.whoOwesYou(userId,groupId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new RuntimeException("something went wrong..."));
        }
    }
}
